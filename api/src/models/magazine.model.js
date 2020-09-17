'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MagazineSchema = Schema({
  author: String,
  title: String,
  edicion: String,
  description: String,
  frequencyActs: String,
  specimens: Number,
  topics: [String],
  keywords: [String],
  copies: Number,
  available: Number,
  countLend: Number,
  countSearch: Number,
});

module.exports = mongoose.model('magazine', MagazineSchema);
