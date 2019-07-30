module.exports = app => {
    const mapperController = require('../controllers/mapper.controller');

    app.post('/mapper/', mapperController.Mapping);
}