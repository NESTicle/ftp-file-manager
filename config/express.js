const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const mongooseMorgan = require('mongoose-morgan');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'pug');

  //Middlewares
  app.use(logger('short'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(cookieParser());
  app.use(compress());

  app.use(mongooseMorgan({ connectionString: 'mongodb://localhost:27017/ftpFileManager' }, {
    skip: (req, res) => {
      return res.statusCode < 400;
    },
  }));

  // Enrutamiento interno
  app.use(express.static(`${config.root}/public`));
  app.use('/nodeModules', express.static(`${config.root}/node_modules/`));
  app.use('/angular', express.static(`${config.root}/public/js/app/`));

  app.use(methodOverride());

  app.use(favicon(`${config.root}/public/img/favicon.ico`));

  app.get('/', (req, res, next) => {
    res.render('index', {
      title: 'Página de Inicio',
    });
  });

  app.get('/ftp', (req, res, next) => {
    let path = req.query.path;

    res.render('ftp', {
      title: 'Administrador de Archivos',
      path: path
    });
  });

  let routes = glob.sync(`${config.root}/app/routes/*.js`);
  routes.forEach(routes => {
    require(routes)(app);
  });

  app.use((req, res, next) => {
    let err = new Error('No ha sido encontrado el recurso solicitado');
    err.status = 404;
    res.header("Content-Type", "application/json; charset=utf-8");
    
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app;
};
