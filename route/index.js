'use strict';
const express = require('express');
const router = express.Router();
const PublicController = require('../controller/PublicController');
const UserController = require('../controller/UserController');

// Public API
router.get('/status', PublicController.checkStatus);

// User API
router.post('/user', UserController.create);

module.exports = router;