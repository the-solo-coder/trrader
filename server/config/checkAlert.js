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
            test();
        }
    });

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
                    }
                    if(alertList[index].condition == 2 && alertList[index].value < result.data.price){
                        console.log(`My price alert: ${alertList[index].value} is less than actual price : ${result.data.price}`)
                        //send a email
                        Alert.deleteOne({_id: alertList[index]._id}, (err) => {
                            if(err) { console.log(err); }
                            else { console.log("Successfully Deleted Alert"); }
                        })
                        alertList.splice(index, 1);
                    }
                })
                .catch((err) => {
                   console.log(err); 
                }); 
            }, 5000);   
        }
    };     
}






