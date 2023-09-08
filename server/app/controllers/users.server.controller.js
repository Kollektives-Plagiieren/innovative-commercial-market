const pool = require('../../config/db'),
    bcrypt = require('bcrypt'),
    jwtGenerator = require('../../config/jwt'),
    nodemailer = require('nodemailer'),
    config = require('../../config/env/development');

// CRUD operations
exports.signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        // User already exists --> unathenticated
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }

        // Hash the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [
                name, email, bcryptPassword
            ]
        );

        // Generating the JWT
        const token = jwtGenerator(newUser.rows[0].user_id);
        
        return res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        // User not found in db --> unathenticated
        if (user.rows.length === 0) {
            return res.status(401).json("Email is not registered");
        }

        // Compare hashed password with db password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        // Wrong password
        if (!validPassword) {
            return res.status(401).json("Password is incorrect");
        }

        // Correct password
        const token = jwtGenerator(user.rows[0].user_id);

        return res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.verify = async(req, res) => {
    try {
        res.json(true);
        // res.redirect('/profile')
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.list = async(req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1", [
                req.user.id
            ]
        );

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.sendEmail = async(req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAUTH2',
                user: config.auth.user,
                pass: config.auth.pass,
                clientId: config.oauth.clientId,
                clientSecret: config.oauth.clientSecret,
                refreshToken: config.oauth.refreshToken
            }
        });

        const mailOptions = {
            from: config.auth.user,
            to: 'dev.kk.nguyen@gmail.com',
            subject: 'Email verification',
            text: 'Hello, Sir. Your computer has virus'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
        });
        res.json({ msg: "Verification email sent"});
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// exports.list = async(req, res, next) => {
//     try {
//         const { accountId } = req.params;
//         const user = await pool.query(
//             "SELECT * FROM user WHERE user_id = $1;",
//             [accountId]
//         );

//         res.json(user.rows[0]);
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// exports.update = async(req, res, next) => {
//     try {
//         const { accountId } = req.params;
//         const { user_name, user_surname, user_email, user_password } = req.body;
//         const user = await pool.query(
//             "UPDATE user " +
//             "SET user_name = $1, user_surname = $2, user_email = $3, user_password = $4 " +
//             "WHERE user_id = $5 " +
//             "RETURNING *;",
//             [user_name, user_surname, user_email, user_password, accountId]
//         );

//         res.json(user.rows[0]);
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// exports.delete = async(req, res, next) => {
//     try {
//         const { accountId } = req.params;
//         const user = await pool.query(
//             "DELETE FROM user " +
//             "WHERE user_id = $1 " +
//             "RETURNING *;",
//             [accountId]
//         );

//         res.json(user.rows[0]);
//     } catch (error) {
//         console.error(error.message);
//     }
// };
