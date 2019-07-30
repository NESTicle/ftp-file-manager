const express = require('express');
const config = require('./config/config');;

const app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log(`${config.app.name} se está ejecutando en el puerto ${config.port}`);
});
