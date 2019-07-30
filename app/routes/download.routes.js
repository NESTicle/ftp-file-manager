module.exports = app => {
    const downloadController = require('../controllers/download.controller.js');

    app.post('/download/:route', downloadController.DownloadFile);
    app.get('/download/', downloadController.DownloadFromRoute);
}