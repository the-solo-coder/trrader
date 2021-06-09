let axios = require('axios');
let express = require('express');

const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=";

// enable jwt
let jwt = require('jsonwebtoken');


module.exports.displayPrice = (req, res, next) => {
    axios(apiUrl+req.params.symbol)
    .then(result => {
        res.status(200).send({ data: result.data} );
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
};
