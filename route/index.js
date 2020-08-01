'use strict';
const express = require('express');
const router = express.Router();
const PublicController = require('../controller/PublicController');
const UserController = require('../controller/UserController');
const AuthController = require('../controller/AuthController');

// No Middleware API
router.get('/status', PublicController.checkStatus);
router.post('/auth/login', AuthController.login);

// User API
router.post('/user', UserController.create);

module.exports = router;