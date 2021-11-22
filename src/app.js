import express from 'express'
require('./config/redis-config');
import smsRoute from './route';
import { logger } from './config/loggerConfig';

const app = express();

const PORT = 9840;

app.use(smsRoute);

app.listen(PORT, () => {
    logger.info(`App running on port ${PORT}`);
});

