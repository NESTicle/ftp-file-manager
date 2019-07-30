module.exports = app => {
    const ftpController = require('../controllers/ftp.controller.js');

    app.get('/ftp/:route', ftpController.GetAllFiles);
    app.post('/ftp/findFiles', ftpController.FindFile);
    app.post('/ftp/isPasswordCorrect', ftpController.IsPasswordCorrect);
}