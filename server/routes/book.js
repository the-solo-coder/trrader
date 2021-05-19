let express = require('express');
let router = express.Router();

// enable jwt
let jwt = require('jsonwebtoken');

let passport = require('passport');

// Connect to book controller
let bookController = require('../controllers/book');

/* GET Route for the Book List page - READ operation. */
router.get('/', bookController.displayBookList);
//router.get('/', passport.authenticate('jwt', {session: false}), bookController.displayBookList);

/* POST Route for processing the Add page - CREATE operation. */
router.post('/add', passport.authenticate('jwt', {session: false}), bookController.processAddPage);

/* POST Route for processing the Edit page - UPDATE operation. */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), bookController.processEditPage);

/* GET Route to perform Deletion - DELETE operation. */
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), bookController.performDelete);

module.exports = router;