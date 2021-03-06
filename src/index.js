import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactPDF, {
	Document,
	Page,
	View,
	Image,
	Text,
	Canvas,
	Link,
	Note,
	Font,
	StyleSheet,
} from '@react-pdf/renderer';

const CONTENT_TYPE = 'Content-Type';

const INFO = 'info';
const WARN = 'warning';
const ERROR = 'error';

const defaultLogger = (level, message) => {
	// eslint-disable-next-line no-console
	console.log(`${new Date()} ${level}: ${message}`);
};

const getBaseComponent = (components, component) => {
	if (component in components) {
		return components[component];
	}
	throw new Error(`No component defined with name ${component}`);
};

const renderReact = async (component, data) => {
	const rootElemComponent = React.createElement(component, data);
	return ReactPDF.renderToStream(rootElemComponent);
};

const createRenderServer = (pdfComponents, { logger = defaultLogger }) => {
	const createPdf = async (template, data, response) => {
		const started = new Date();
		try {
			let reactTemplate;
			try {
				reactTemplate = getBaseComponent(pdfComponents, template);
			} catch (e) {
				logger(WARN, `Template ${template} does not exist`);
				response.status(404).end();
				return;
			}

			const readStream = await renderReact(reactTemplate, data);

			response.set(CONTENT_TYPE, 'application/pdf');
			readStream.pipe(response);

			// When the stream end the response is closed as well
			readStream.on('end', () => logger(INFO, `Rendered template ${template} in ${new Date() - started}ms`));
		} catch (e) {
			logger(ERROR, `Error occurred while rendering: "${e}"`);
			response.status(500).end();
		}
	};

	const server = express();

	server.use(bodyParser.json({ limit: '1mb' }));
	server.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

	server.get('/favicon.ico', (request, response) => response.status('404').end());

	server.get('/:template', (req, res) => createPdf(req.params.template, req.query, res));
	server.post('/:template', (req, res) => {
		const data = req.body;
		Object.keys(req.query).forEach((value) => {
			if (data[value]) {
				logger(WARN, `Body property '${value}' was overwritten by query param.`);
			}
			data[value] = req.query[value];
		});
		createPdf(req.params.template, data, res);
	});

	return server;
};

// We will export all types from ReactPDF so people can use those and there is only one render path
export {
	Document,
	Page,
	View,
	Image,
	Text,
	Canvas,
	Link,
	Note,
	Font,
	StyleSheet,
};

export default createRenderServer;
