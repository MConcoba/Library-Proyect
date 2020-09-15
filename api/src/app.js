'use strict';

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');

var route_user = require('./routers/user.route');
var route_book = require('./routers/book.route');
var route_magazine = require('./routers/magazine.route');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Authoruzation, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
	);
	res.header('Access-Control-Allow-Methods', 'SET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'SET, POST, OPTIONS, PUT, DELETE');

	next();
});

app.use('/api', route_user, route_book, route_magazine);

module.exports = app;
