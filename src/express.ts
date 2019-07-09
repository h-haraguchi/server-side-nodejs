import express from 'express';
import {logger} from './logger';

const PORT = 3000;

export function startWebServer() {
	const app = express();

	app.use("/", express.static('public'));

	app.listen(PORT, () => logger.application.info(`Example app listening on port ${PORT}!`));
}

startWebServer();
