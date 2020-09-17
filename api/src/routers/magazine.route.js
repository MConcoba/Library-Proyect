'use strict';

var express = require('express');
var MagazineController = require('../controllers/magazine.controller');
var md_auth = require('../middleware/autentificated');

var api = require('express-promise-router')();

api.post('/new-magazine', md_auth.ensureAuth, MagazineController.newMagazine);
api.get('/get-magazines', MagazineController.getMagazines);
api.get('/get-magazine/:idMagazine', MagazineController.getMagazine);
api.put(
  '/update-magazine/:idMagazine',
  md_auth.ensureAuth,
  MagazineController.updateMagazine
);
api.delete(
  '/delete-magazine/:idMagazine',
  md_auth.ensureAuth,
  MagazineController.deleteMagazine
);
api.get('/search-magazine-title', MagazineController.searchTitle);
api.get('/search-magazine-keywords', MagazineController.searchKeywords);
api.get(
  '/lend-magazine/:idMagazine',
  md_auth.ensureAuth,
  MagazineController.lendMagazine
);
api.get(
  '/return-magazine/:idMagazine',
  md_auth.ensureAuth,
  MagazineController.returnMagazine
);
api.get(
  '/get-magazine-lend',
  md_auth.ensureAuth,
  MagazineController.getMagazineLendUser
);
api.get(
  '/get-count-magazine-lend-porcentaje',
  md_auth.ensureAuth,
  MagazineController.getMagazinekCoutnLendProcentaje
);
api.get(
  '/get-count-magazine-lend',
  md_auth.ensureAuth,
  MagazineController.getMagazineCoutnLend
);

module.exports = api;
