let express = require('express');
let router = express.Router();

// middleware
let auth = require("../middleware/auth");

let userController = require('../controllers/users');

// @route POST /api/user/signin
// @desc Auth User
// @access Public
router.post("/signin", userController.signin);

// @route POST /api/user/register
// @desc Register User
// @access Public
router.post("/signup", userController.signup);


module.exports = router;
