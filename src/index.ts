import app from './app'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { join } from 'path'

app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')));

// setup error handlers for uncaught rejections and errors
process.on('uncaughtException', error => console.error(`Uncaught exception... ${error.stack}`));
process.on('unhandledRejection', error => {
    console.error(`Uncaught rejection... ${error.stack}`);
    process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, (error: Error) => error ? console.error(error) :  console.log(`Server is listening on port ${port}`));

