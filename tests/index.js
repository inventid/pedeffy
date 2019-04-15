import fetch from 'node-fetch';
import fs from 'fs';
import DiffMatchPatch from 'diff-match-patch';
import color from 'cli-color';
import createRenderServer from '../src';
import pdfComponents from './src/index';

const dir = `${__dirname}/result`;
const port = process.env.PORT || 3000;

const logger = (level, message) => {
	if (level === 'info') {
		// Drop these in tests
		return;
	}
	console.log(JSON.stringify({ level, message, datetime: (new Date()).toISOString() }));
};

const cliColors = {
	'-1': color.greenBright,
	0: x => x,
	1: color.redBright,
};

const WRITE_MODE = process.argv[2] === '--update';
const dmp = new DiffMatchPatch();
const fileOptions = {
	encoding: 'utf8',
};

const eliminateCreationDate = input => input.toString().split('\n')
	.filter(e => !e.startsWith('/CreationDate '))
	.filter(e => !e.startsWith('/BaseFont '))
	.filter(e => !e.startsWith('/FontName '))
	.join('\n');

const compare = async (template, path, result) => {
	if (WRITE_MODE) {
		// The original is written, including the annoying parts which trigger git changes
		// Otherwise the resulting PDF might now be readable on certain platforms :\
		console.log(color.green(`Writing ${template} to ${path}`));
		fs.writeFileSync(path, result, fileOptions);
	} else {
		const expectation = eliminateCreationDate(fs.readFileSync(path, fileOptions).toString());
		const cleanedResult = eliminateCreationDate(result);
		if (expectation !== cleanedResult) {
			console.log(color.red(`\n\nMismatch in ${template}. The following diff was generated:`));

			const diff = dmp.diff_main(expectation, cleanedResult, false);
			for (let i = 0; i < diff.length; i += 1) {
				let [type, text] = diff[i];
				if (text === '\n') {
					text = '<NEW_LINE>';
				} else if (text && text.trim().length === 0) {
					text = '<EMPTY_LINE />';
				}
				const colored = cliColors[type.toString()](text);
				process.stdout.write(colored);
			}
			process.exit(1);
		}
	}
};

let server;
const onReady = async () => {
	await fs.access(dir, fs.constants.F_OK, async (err) => {
		if (err) {
			await fs.mkdir(dir);
		}
	});
	const components = Object.keys(pdfComponents);

	for (let i = 0; i < components.length; i += 1) {
		const template = components[i];
		const result = await fetch(`http://localhost:${port}/${template}`).then(x => x.buffer());
		const path = `${dir}/${template}.pdf`;
		await compare(template, path, result);
	}

	console.log(color.yellow('Some errors are expected below as part of the test suite'));

	// No such template
	const notFoundStatus = await fetch(`http://localhost:${port}/ThisOneReallyDoesNotExist`).then(x => x.status);
	if (notFoundStatus !== 404) {
		// Should not exist
		console.error(color.redBright(`Non existing template did not return a 404, got ${notFoundStatus} instead`));
		process.exit(1);
	}

	// No such template
	const emptyStatus = await fetch(`http://localhost:${port}/empty`).then(x => x.status);
	if (emptyStatus !== 200) {
		// Should have thrown
		console.error(color.redBright(`Empty template did not return a 200, got ${emptyStatus} instead`));
		process.exit(1);
	}

	server.close();

	if (WRITE_MODE) {
		console.log(color.red('All snapshots have been written'));
	} else {
		console.log(color.green('All snapshots match'));
	}
};

const options = {
	logger,
};
server = createRenderServer(pdfComponents, options).listen(port, onReady);
