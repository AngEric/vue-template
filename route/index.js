'use strict';
const express = require('express');
const router = express.Router();
const PublicController = require('../controller/PublicController');
const UserController = require('../controller/UserController');
const AuthController = require('../controller/AuthController');
const PermissionController = require('../controller/PermissionController');
const RoleController = require('../controller/RoleController');

const RoleValidator = require('../validators/role');

// No Middleware API
router.get('/status', PublicController.checkStatus);
router.post('/auth/login', AuthController.login);

// User API
router.post('/user', UserController.create);

// Permission API
router.get('/permission', PermissionController.list);

// Role API
router.get('/role', RoleController.list);
router.post('/role', RoleController.create);
router.put('/role/status', RoleValidator.validateUpdateStatus, RoleController.updateStatus);

module.exports = router;