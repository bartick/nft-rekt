import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

import routes from './routes';

app.use(routes);

export default app;