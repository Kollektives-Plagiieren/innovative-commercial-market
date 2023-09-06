module.exports = function(req, res, next) {
    const { email, name, password } = req.body;

    function validEmail(userEmail) {
        // TODO: use a npm package like in
        // https://github.com/manishsaraan/email-validator to validate email addresses
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
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
