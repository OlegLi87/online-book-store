const chalk = require('chalk');
const mongoose = require('mongoose');
const connectionString = process.env.DB_CONNECTION_STRING;

// !Openning connection,addiding listeners,
mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.bgBlue('Connection with database successfully established!')))
  .catch((err) => console.log(chalk.bgRed('Initial connection failed' + err)));

mongoose.connection.on('error', (err) => {
  console.log(chalk.red('Connection failed', err));
});

// !Closing connection
if (process.platform === 'win32') {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('close', () => {
    process.emit('SIGUSR2');
  });

  const msgText = 'Closing db connection on';

  process.on('SIGINT', () => {
    gracefullShutdown(`${msgText} server shutdown`, () => process.exit(0));
  });

  process.on('SIGUSR2', () => {
    gracefullShutdown(`${msgText} server restart`, () => process.kill(process.pid));
  });

  function gracefullShutdown(message, callback) {
    console.log(chalk.bgBlue(message));
    mongoose.connection.close().then(() => {
      console.log(chalk.bgBlue('Connection closed'));
      callback();
    });
  }
}
