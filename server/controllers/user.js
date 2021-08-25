let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let bcrypt = require("bcryptjs");
let config = require("config");

// enable jwt
let jwt = require("jsonwebtoken");
let DB = require("../config/db");

// middleware
let auth = require("../middleware/auth");

//create user model instance
let User = require("../models/user");
// alias

module.exports.processUserLogin = (req, res, next) => {
    const { email, password } = req.body.data;
    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: "User does not exists" });
    
        // Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email,
              };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                  expiresIn: 604800, // 1 week
                },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username,
                      email: user.email,
                      displayName: user.displayName,
                    },
                  });
                }
              );
        })

      });
};

module.exports.checkLoggedUser = (req, res, next) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}

module.exports.processUserRegistration = (req, res, next) => {
  const { username, email, password, displayName } = req.body.data;

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      email,
      password,
      displayName,
    });

    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then((user) => {
          const payload = {
            id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
              expiresIn: 604800, // 1 week
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  displayName: user.displayName,
                },
              });
            }
          );
        });
      });
    });
  });
};

module.exports.processUserLogout = (req, res, next) => {
  req.logout();
  res.json({ success: true, msg: "User Successfully Logged out!" });
};
