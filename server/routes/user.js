let express = require('express');
let router = express.Router();

// middleware
let auth = require("../middleware/auth");

let userController = require('../controllers/user');

// @route POST /api/user/login
// @desc Auth User
// @access Public
router.post('/login', userController.processUserLogin);

// @route POST /api/user/register
// @desc Register User
// @access Public
router.post('/register', userController.processUserRegistration);

// @route GET /api/user
// @desc Get User Data
// @access Private
router.get('/', auth, userController.checkLoggedUser);


// @route GET /api/user/logout
// @desc Perform User Logout
// @access Private
router.get('/logout', userController.processUserLogout);

module.exports = router;
