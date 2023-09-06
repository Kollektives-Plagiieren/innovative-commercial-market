process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const postgres = require('./config/db'),
    express = require('./config/express');

const db = postgres;
const app = express();

app.listen(5000, () => {
    console.log("Server has started on port 5000")
});
