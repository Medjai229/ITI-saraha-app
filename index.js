import * as dotenv from 'dotenv';
import e from 'express';
import bootstrap from './src/app.controller.js';
import connectDB from './src/db/connection.js';
dotenv.config({});
connectDB();

const app = e();

bootstrap(app, e);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
