import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import cors from 'cors';

import fileRoutes from './routes/file';

const app = express()

app.use(cors())
app.use(`/${process.env.APP_STORAGE}`, express.static(path.join(__dirname, `../${process.env.APP_STORAGE}`)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/file', fileRoutes);

// Home page
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/pages/home.html'));
});

export default app;
