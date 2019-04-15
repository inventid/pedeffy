import createRenderServer from '../src/index';

import resume from './resume/index';
import inventid from './inventid/firstPage';
import quixote from './quixote/index';

const pdfComponents = {
	resume,
	inventid,
	quixote,
};

const port = process.env.PORT || 3000;

const log = (level, message) => {
	// eslint-disable-next-line no-console
	console.log(JSON.stringify({ level, message, datetime: (new Date()).toISOString() }));
};

const onReady = () => log('info', 'Server is ready');

createRenderServer(pdfComponents, log).listen(port, onReady);
