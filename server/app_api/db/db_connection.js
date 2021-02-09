const chalk = require('chalk');
const mongoose = require('mongoose');
const connectionString = process.env.DB_CONNECTION_STRING;

// !Openning connection,addiding listeners,
mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.yellowBright('connection with database successfully established!')))
  .catch((err) => console.log(chalk.red('Initial connection failed' + err)));

mongoose.connection.on('error', (err) => {
  console.log(chalk.red('Connection failed', err));
});

// !Closing connection
const readline = require('readline');

process.on('SIGINT', () => {
  console.log('closing');
});
