let express = require('express')
let router = express.Router()

// middleware
let auth = require('../middleware/auth')

let userController = require('../controllers/users')

/* Get Profile by Id */
router.get('/getProfile/:id', userController.getProfileById)

// @route POST /api/user/signin
// @desc Auth User
// @access Public
router.post('/signin', userController.signin)

// @route POST /api/user/register
// @desc Register User
// @access Public
router.post('/signup', userController.signup)

/* PATCH Route to update an Profile in the Database. */
router.patch('/updateProfile/:uid', userController.updateProfile)

module.exports = router
