const jwt = require('jsonwebtoken'),
    config = require('../../config/env/development');

module.exports = function(req, res, next) {
    const token = req.header("jwt_token");
    console.log("The token is: " + token);

    // Check if token exists
    if (!token) {
        return res.status(403).json({ msg: "Authorization denied" });
    }

    // Verify the token
    try {
        // Returns user:{ id: user.id })
        const verify = jwt.verify(token, config.jwtSecret);

        req.user = verify.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
