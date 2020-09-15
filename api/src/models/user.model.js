'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	carnet: String,
	dpi: String,
	name: String,
	lastName: String,
	userName: String,
	email: String,
	password: String,
	role: String,
	amount_book_borrowed: Number,
	amount_magazine_borrowed: Number,
	books_borrowed: [
		{
			book: { type: Schema.ObjectId, ref: 'book' },
		},
	],
	magazines_borrowed: [
		{
			magazine: { type: Schema.ObjectId, ref: 'magazine' },
		},
	],
});

module.exports = mongoose.model('user', UserSchema);
