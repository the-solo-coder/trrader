let axios = require('axios');
let express = require('express');
let Alert = require('../models/alert');

const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=";


module.exports.displayPrice = (req, res, next) => {
    axios(apiUrl+req.params.symbol)
    .then(result => {
        res.status(200).send({ data: result.data} );
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
};

module.exports.addAlert = (req, res, next) => {
    console.log(req.body);
    let newAlert = Alert(req.body);

    Alert.create(newAlert, (err, Alert) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.status(200).send({success: true, msg: 'Successfully Added New Alert'});
        }
    });
}

