var validator = require("email-validator");


module.exports = function (req, res, next) {
    const { email, name, password } = req.body;

    /**
     * 
     * @param {*} userEmail user login email 
     * @returns {*} boolean 
     * 
     * true if email is valid, else false
     */

    function validEmail(userEmail) {
        // validate user Email
        return validator.validate(userEmail);
        
    }

    if (req.path === '/signup') {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json({ msg: "Missing credentials" });
        } else if (!validEmail(email)) {
            return res.status(401).json({ msg: "Invalid email" });
        }
    } else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.status(401).json({ msg: "Missing credentials" });
        } else if (!validEmail(email)) {
            return res.status(401).json({ msg: "Invalid email" });
        }
    }

    next();
};
