// This file is responsible for configuring our Express application

const express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    config = require('./config'),
    session = require('express-session'),
    cors = require('cors');

module.exports = function() {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process,env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // app.use(bodyParser.json());
    app.use(express.json());
    app.use(methodOverride());

    // Cookie settings
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Rendering EJS views with EJS templates
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    // Handling static files
    app.use(express.static('./public'));

    return app;
};
