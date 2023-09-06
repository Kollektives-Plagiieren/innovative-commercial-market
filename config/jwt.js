const jwt = require('jsonwebtoken'),
    config = require('./env/development');

function jwtGenerator(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    }

    return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" })
}

module.exports = jwtGenerator;
