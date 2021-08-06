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

module.exports.deleteAlert = (req, res, next) => {
    
    let id = req.params.id;
    Alert.deleteOne({_id: id}, (err) => {
        if(err) { 
            console.log(err);
            res.end(err); 
        }else { 
            console.log("Successfully Deleted Alert");
            res.status(200).send({success:true, msg: 'Successfully Deleted Alert'}); 
        }
    });
};

module.exports.getAllAlerts = (req, res, next) => {
    
    Alert.find((err, alertList) =>{
        if(err){
            return console.error(err);
        }else{
            res.status(200).send({success:true, data: alertList});
        }
    })
};

module.exports.addAlert = (req, res, next) => {
    let newAlert = Alert(req.body);
    console.log(newAlert);

    Alert.create(newAlert, (err, Alert) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.status(200).send({success: true, msg: 'Successfully Added New Alert'});
        }
    });
}

module.exports.updateAlert =  (req, res, next) => {
    let id = req.params.id;

    let updatedAlert = Alert({
        "symbol": req.body.symbol,
        "condition": req.body.condition,
        "value": req.body.value
    });

    Alert.updateOne({_id: id}, updatedAlert, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else { 
            console.log("Successfully updated the alert!"); 
        }
    });
}


