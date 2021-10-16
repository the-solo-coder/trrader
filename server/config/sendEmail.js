let nodemailer = require('nodemailer');
require('dotenv').config();


module.exports = function (message, receiver) {
    var transporter = nodemailer.createTransport({
        service:'hotmail',
        auth: {
            user: process.env.EMAIL_USER, //input email username
            pass: process.env.EMAIL_PASSWORD //input actual password
        }
    }); 

    var mailOptions = {
        from: '"Trrader - Your digital crypto platform" <trraderr@hotmail.com>',
        to: receiver,
        subject: 'Trrader Alert',
        html: `<b>${message}</b> <br/><br/><br/>
        <img src="https://preview.pngtab.com/14/5/5/YXFe7KtL3c/trader-investment-logo-trading-strategy-price-action.jpg" alt="Crypto" width="800" height="200" style="vertical-align:middle;margin:50px 0px">`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  }