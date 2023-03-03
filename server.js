const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env
dotenv.config({ path: './config/config.env' });

//connectdb
connectDB();

// route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running in`));

//handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`error: ${err.message}`);

  //close server
  server.close(() => process.exit(1));
});
