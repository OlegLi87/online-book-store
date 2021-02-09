const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const PORT = parseInt(process.env.PORT);

app.use(cors());
require('./app_api/db/db_connection');

app.listen(PORT, () => {
  console.log(chalk.blueBright(`server is up and running on port : ${PORT}`));
});
