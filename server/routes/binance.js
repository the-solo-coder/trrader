let express = require('express');
let router = express.Router();

// enable jwt
let jwt = require('jsonwebtoken');

let passport = require('passport');

// Connect to binance controller
let binanceController = require('../controllers/binance');

router.get('/getAllAlerts', binanceController.getAllAlerts);

router.delete('/:id', binanceController.deleteAlert); 

/* GET Route for the Price of a specific Crypto. */
router.get('/:symbol', binanceController.displayPrice);
//router.get('/', passport.authenticate('jwt', {session: false}), binanceController.displayPrice);

/* POST Route to add a new Alert into the Database. */
router.post('/addAlert', binanceController.addAlert);
//router.post('/addAlert', passport.authenticate('jwt', {session: false}),  binanceController.addAlert);

module.exports = router;