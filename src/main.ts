import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import svgRoute from './routes/svgRoute'; // Import the new route

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(routes);
app.use('/svg', svgRoute); // Add the new route under the '/svg' path

export default app;