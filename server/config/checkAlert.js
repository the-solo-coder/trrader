let axios = require('axios');
let Alert = require('../models/alert');

module.exports = () =>
{
    const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=";
    let alertList = [];
    
    // find all my alerts
    Alert.find((err, resultList) => {
        if(err){return console.error(err);}
        else{
            alertList = resultList;
            //test();
            //test2(); //Richard test for alerts every 10 minutes
            //test3(); //testing to see if I can send an email to myself - does not work atm
        }
    });


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
            text: `The price of BTCUSDT is `+ bitcoinPrice //a placeholder number for the actual value
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    sendEmail();

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
    }

    const test = ()=>{ 
        for (let index = 0; index < alertList.length; index++) {
            //checking my alert conditions ( ** 1 - Greater than > ** and ** 2 Less than < ** )
            setInterval(() => {
                axios(apiUrl+alertList[index].symbol)
                .then(result => {
                    console.log(`My actual price is : ${result.data.price}`)
                    if(alertList[index].condition == 1 && alertList[index].value > result.data.price){
                        console.log(`My price alert: ${item.value} is more than actual price : ${result.data.price}`)
                        Alert.deleteOne({_id: alertList[index]._id}, (err) => {
                            if(err) { console.log(err); }
                            else { console.log("Successfully Deleted Alert"); }
                        })
                        alertList.splice(index, 1);
                        sendEmail(result.data.price);

                    }
                    if(alertList[index].condition == 2 && alertList[index].value < result.data.price){
                        console.log(`My price alert: ${alertList[index].value} is less than actual price : ${result.data.price}`)
                        //send a email
                        Alert.deleteOne({_id: alertList[index]._id}, (err) => {
                            if(err) { console.log(err); }
                            else { console.log("Successfully Deleted Alert"); }
                        })
                        alertList.splice(index, 1);
                        sendEmail(result.data.price);
                    }
                })
                .catch((err) => {
                   console.log(err); 
                }); 
            }, 5000);   
        }
    };      */
}






