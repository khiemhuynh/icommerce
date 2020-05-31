const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoose = require('mongoose');
const config = require('./config');
const TrackingEvent = mongoose.model('TrackingEvent', {
  type: {
    type: String,
    required: true,
    trim: true,
  },
  params: {
    type: String,
    required: false,
    trim: true,
  },
});


let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    console.info(`Listening to port ${config.port}`);
  });
});

app.post('/events', (req, res) => {
  try {
    const event = req.body;
    TrackingEvent.create(event)

    res.send({ status: 'OK' });
  } catch (e) {
    console.error(e);
    res.send(500);
  }
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});