import express from 'express'
import bodyParser from 'body-parser';
require('./config/redis-config');
import smsRoute from './route';
import { logger } from './config/loggerConfig';

const app = express();

const PORT = 9866;

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(smsRoute);


app.listen(PORT, () => {
    logger.info(`App running on port ${PORT}`);
});

