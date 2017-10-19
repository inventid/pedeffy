// Conditionally load it, so people can use babel-node as well
if (!global._babelPolyfill) {
	require('babel-polyfill');
}

import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactPDF from '@react-pdf/node';
import uuidV4 from 'uuid-v4';

const CONTENT_TYPE = 'Content-Type';

const INFO = 'info';
const WARN = 'warning';
const ERROR = 'error';

const defaultLogger = (level, message) => console.log(`${new Date()} ${level}: ${message}`);

const getBaseComponent = (components, component) => {
	if (component in components) {
		return components[component];
	} else throw new Error(`No component defined with name ${component}`)
};

const renderReact = async (component, data) => {
	const rootElemComponent = React.createElement(component, data);
	const path = `${uuidV4()}.pdf`;
	return await ReactPDF.renderToStream(rootElemComponent);
};

const createRenderServer = (pdfComponents, log = defaultLogger) => {
	const createPdf = async (template, data, response) => {
		const started = new Date();
		try {
			let reactTemplate;
			try {
				reactTemplate = getBaseComponent(pdfComponents, template);
			} catch (e) {
				log(WARN, `Template ${template} does not exist`);
				response.status(404).end();
				return;
			}
			response.set(CONTENT_TYPE, "application/pdf");
			const readStream = await renderReact(reactTemplate, data);
			readStream.pipe(response);
			// When the stream end the response is closed as well
			readStream.on('end', () => log(INFO, `Rendered template ${template} in ${new Date() - started}ms`));
		} catch (e) {
			log(ERROR, `Error occurred while rendering: "${e}"`);
			response.status(500).end();
		}
	};

	const server = express();

	server.use(bodyParser.json({limit : '1mb'}));
	server.use(bodyParser.urlencoded({limit : '1mb', extended : true}));

	server.get('/favicon.ico', (request, response) => response.status('404').end());

	server.get('/:template', async (req, res) => createPdf(req.params.template, req.query, res));
	server.post('/:template', async (req, res) => {
		const data = req.body;
		Object.keys(req.query).forEach(value => {
			if (data[value]) {
				log(WARN, `Body property '${value}' was overwritten by query param.`);
				data[value] = req.query[value];
			}
		});
		createPdf(req.params.template, data, res)
	});

	return server;
};

module.exports = createRenderServer;
