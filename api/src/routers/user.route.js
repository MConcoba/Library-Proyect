'use strict';

var express = require('express');
var UserController = require('../controllers/user.controller');
var md_auth = require('../middleware/autentificated');

var api = require('express-promise-router')();

api.post('/login', UserController.login);
api.post('/create-user', md_auth.ensureAuth, UserController.newUser);
api.get('/get-users', md_auth.ensureAuth, UserController.getUsers);
api.get('/get-user/:idUser', md_auth.ensureAuth, UserController.getUser);
api.get('/user-profile', md_auth.ensureAuth, UserController.userProfile);
api.put('/update-user/:idUser', md_auth.ensureAuth, UserController.updateUser);
api.delete('/delete-user/:idUser', md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;
