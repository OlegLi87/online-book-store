const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const booksRouter = require('./app_api/routes/books');
const PORT = parseInt(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

app.use(booksRouter);

require('./app_api/db/db_connection');

app.listen(PORT, () => {
  console.log(chalk.bgBlue(`Server is up and running on port : ${PORT}`));
});
