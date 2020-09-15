'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = Schema({
	author: String,
	title: String,
	edicion: String,
	keywords: [String],
	description: String,
	topics: [String],
	copies: Number,
	available: Number,
});

module.exports = mongoose.model('book', BookSchema);
