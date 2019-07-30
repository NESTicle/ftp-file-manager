module.exports = app => {
    const oauthController = require('../controllers/oauth.controller');

    app.post('/login/', oauthController.Login);
    app.get('/login/', oauthController.LoginView);
    app.get('/logout/', oauthController.Logout);
}