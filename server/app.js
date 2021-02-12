const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const booksRouter = require('./app_api/routes/books');
const usersRouter = require('./app_api/routes/users');
const {
  errorHandler,
  ResponseError,
} = require('./app_api/middleware/errorHandler');
const PORT = parseInt(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

app.use(booksRouter);
app.use('/users', usersRouter);
app.use('*', (req, res, next) => {
  next(new ResponseError('End point not found'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(chalk.bgBlue(`Server is up and running on port : ${PORT}`));
  require('./app_api/db/db_connection');
});
