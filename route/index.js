'use strict';
const express = require('express');
const router = express.Router();
const PublicController = require('../controller/PublicController');

router.get('/status', PublicController.checkStatus);

module.exports = router;