const user = require('../controllers/users.server.controller');

module.exports = function(app) {    
    app.route('/signup')
        .post(user.create);

    app.route('/login')
        .post(user.login);

    // app.route('/users/:userId')
    //     .get(user.list)
    //     .put(user.update)
    //     .delete(user.delete);
};
