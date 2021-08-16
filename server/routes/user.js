let express = require('express');
let router = express.Router();

let userController = require('../controllers/user');

/* POST Route for processing the Login page. */
router.post('/login', userController.processUserLogin);

/* POST Route for processing the Register page. */
router.post('/register', userController.processUserRegistration);


/* GET Route to perform user Logout */
router.get('/logout', userController.processUserLogout);

module.exports = router;
