exports.Login = (req, res) => {
    /* 
     * App: Calipsu
     * Pass: Ips Universitaria
     * Hash: 8b1771896cee4da58857018b61f3aed4
    */

    let user = {
        username: req.body.user,
        email: req.body.email
    };

    res.cookie('calipsu_logged_user', user);
    res.redirect('/');
};

exports.LoginView = (req, res) => {

};

exports.Logout = (req, res) => {
    res.clearCookie('calipsu_logged_user');
    res.redirect('/');
};