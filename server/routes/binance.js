let express = require('express');
let router = express.Router();

// enable jwt
let jwt = require('jsonwebtoken');

let passport = require('passport');

// Connect to binance controller
let binanceController = require('../controllers/binance');

/* GET Route for the Book List page - READ operation. */
router.get('/:symbol', binanceController.displayPrice);
//router.get('/', passport.authenticate('jwt', {session: false}), binanceController.displayPrice);

module.exports = router;