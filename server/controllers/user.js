let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create user model instance
let userModel = require('../models/user');
let User = userModel.User; // alias


module.exports.processUserLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        //if server err?
        if (err) {
            console.log(`Error: ${err.name}}`)
            return res.json({success: false, msg: `Error: ${err.name}}`});
        }

        //is there a user login error?
        if (!user) {
            console.log('Error: Authentication Error!')
            return res.json({success: false, msg: 'Error: Authentication Error!'});
        } 

        req.login(user, (err) => {
            // server error?
            if(err) {
                return next(err);
            }

            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            };

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});

        });
        
    })(req, res, next);
}


module.exports.processUserRegistration = (req, res, next) => {

    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    })

    User.register(newUser, req.body.password, (err) => {
        if(err) {
            console.log("Error: Inserting new user");
            if(err.name == "UserExistsError") {
                console.log('Error: User Already Exists!')
                return res.json({success: false, msg: 'Error: User Already Exists!'});
            } else {
                console.log(`Error: ${err.name}}`)
                return res.json({success: false, msg: `Error: ${err.name}}`});
            }
        } else {
            return res.json({success: true, msg: 'User Registered Successfully!'});
        }

    })
}

module.exports.processUserLogout = (req, res, next) => {
    req.logout();
    res.json({success: true, msg: 'User Successfully Logged out!'});
}
