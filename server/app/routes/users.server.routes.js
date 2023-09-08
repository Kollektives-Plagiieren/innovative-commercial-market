const user = require('../controllers/users.server.controller'),
    validate = require('../controllers/validation.server.controller')
    authorize = require('../controllers/authorization.server.controller');

module.exports = function(app) {    
    app.route('/signup')
        .post(validate, user.signup);

    app.route('/login')
        .post(validate, user.login);

    app.route('/verify')
        .post(authorize, user.verify);

    app.route('/verify/email')
        .get(user.sendEmail);

    app.route('/profile')
        .get(authorize, user.list);

    // app.route('/users/:userId')
    //     .get(user.list)
    //     .put(user.update)
    //     .delete(user.delete);
};
