let axios = require('axios');
let Alert = require('../models/alert');

module.exports = () =>
{
    const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=";
    let alertList = [];
    

    //Send Email Function
    const sendEmail = (bitcoinPrice)=>{
                
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service:'hotmail',
            auth: {
                user: 'alessandra60@hotmail.com', //input gmail username
                pass: '#Ale190695' //input actual password
            }
        });

        var mailOptions = {
            from: 'alessandra60@hotmail.com',
            to: 'sergiobtos@hotmail.com',
            subject: 'Sending Email using Node.js',
            text: `The price of BTCUSDT now is `+ bitcoinPrice //a placeholder number for the actual value
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    //10-minute alert TR-26 - currently working
    /* const test2 = ()=>{
        const bitCoinUSD = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
        setInterval(() => {
        axios(bitCoinUSD).then(result => {
            console.log(`BTCUSDT is currently : ${result.data.price}`);
        })
        .catch((err) => {
            console.log(err); 
         });}, 100000); //10-minute timer
    }*/

    //checking my alert conditions ( ** 1 - Greater than > ** and ** 2 Less than < ** )
    const checkAlert = ()=>{
        setInterval(() => {
            //check alert in database
            Alert.find((err, alertList) => {
                if(err){return console.error(err);}
                else{
                    for (let i = 0; i < alertList.length; i++) {
                        axios(apiUrl+alertList[index].symbol)
                        .then(result => {
                            if(alertList[index].condition == 1 && alertList[index].value > result.data.price){
                              Alert.deleteOne({_id: alertList[index]._id}, (err) => {
                                    if(err) { console.log(err); }
                                    else { console.log("Successfully Deleted Alert"); }
                              })
                              sendEmail(result.data.price);
                            }
                            if(alertList[index].condition == 2 && alertList[index].value < result.data.price){
                                Alert.deleteOne({_id: alertList[index]._id}, (err) => {
                                      if(err) { console.log(err); }
                                      else { console.log("Successfully Deleted Alert"); }
                                })
                                sendEmail(result.data.price);
                    }
                    })
                    .catch((err) => {
                    console.log(err); 
                    });     
                    }
                }
            });
        }, 5000);
    };
}






