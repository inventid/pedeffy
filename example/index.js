// Conditionally load it, so people can use babel-node as well
if (!global._babelPolyfill) {
	require('babel-polyfill');
}

const createRenderServer = require('../src/index');
const pdfComponents = {
	resume: require('./resume/index'),
	inventid: require('./inventid/firstPage'),
};

const port = process.env.PORT || 3000;

const log = (level, message) => {
	console.log(JSON.stringify({level, message, datetime : (new Date()).toISOString()}));
};

const onReady = () => log('info', 'Server is ready');

createRenderServer(pdfComponents, log).listen(port, onReady);
