import React, { useState, useEffect } from 'react';
import axios from 'axios';
import webHost from '../../../config/web';

import './AlertList.css';
import Card from '../../../UIElements/Card';

const AlertList = () => {
 const [list, setList]= useState({});

 useEffect(() => {
  const fetchAlertList = () => {
      axios.get(webHost.URI + "/getAllAlerts")
          .then((res) => {
              setList(res.data.alertList)
              console.log("AlertLIst.js line 16: ",res.data.alertList)
          })
          .catch((error) => {
              console.log(error);
          });
  }
  fetchAlertList();
 
}, [list]);
 

    if (list.length === 0) {
        return (
            <div className="alert-list center">
                <Card>
                    <h2>No alerts found.</h2>
                </Card>
            </div>
        );
    }

    return (
    <React.Fragment>
      <div>
        {list.map(alert => (
          <div className="card card-primary card-outline" key={alert._id}> 
          <div className="card-body"> 
          <h5 className="class-title">Symbol: { alert.symbol}</h5>
          <p className="card-text">
            Send me a email if price if { alert.condition === 1 ? 'more than' : 'less than'} {alert.value}.
          </p>
          <a href="/" className="card-link">Edit</a>
          <a href="/" className="card-link">Delete</a>
          </div>
          </div>
        ))}
      </div>
    </React.Fragment>
    )

};

export default AlertList;