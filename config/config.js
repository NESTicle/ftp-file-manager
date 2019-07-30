const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'calipsu'
    },
    port: process.env.PORT || 3000,
    currentUrl: 'http://localhost:3000/login',
    oauth: 'http://192.168.91.5:7171',
  },

  test: {
    root: rootPath,
    app: {
      name: 'calipsu'
    },
    port: process.env.PORT || 3000,
    currentUrl: 'http://10.20.65.67:3000/login',
    oauth: 'http://192.168.91.5:7171',
  },

  production: {
    root: rootPath,
    app: {
      name: 'calipsu'
    },
    port: process.env.PORT || 3000,
    currentUrl: 'http://10.20.65.67:3000/login',
    oauth: 'http://10.20.65.66:82',
  }
};

module.exports = config[env];
