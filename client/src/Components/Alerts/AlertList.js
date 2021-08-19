import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';

import webHost from '../../config/web';
import api from '../../config/web';
import Card from '../../UIElements/Card';

const AlertList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const deleteHandler = (id) => {
    //delete alert using the id
    axios.delete(`${api.URI}/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //reload page after deleting alert
    window.location.reload();
  }
 
  useEffect(() => {
    const fetchData = async () => {
      //calling the API to get all alerts from database ( locally)
      await axios.get(webHost.URI + "/getAllAlerts")
        .then((res) => {
          setList(res.data.alertList)
          setLoading(false);
          //print all data received from database in the console web browser
          //console.log("AlertList.js line 16: ", res.data.alertList)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
  
    fetchData();
  }, [])

  if (loading) {
    return (
      <div className="content-wrapper"></div>
    );
  }
  if (list.length === 0) {
    return (
      <div className="content-wrapper">
        <Card>
          <h2>No alerts found.</h2>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="content-wrapper">
        {list.map(alert => (
          <div className="card card-primary card-outline" key={alert._id}>
            <div className="card-body">
              <h5 className="class-title">Symbol: {alert.symbol}</h5>
              <p className="card-text">
                Send me a email if price if {alert.condition === 1 ? 'more than' : 'less than'} {alert.value}.
              </p>
              <a href="/alerts/:alertId" className="card-link">Edit</a> 
              &nbsp;
              <button onClick={() => deleteHandler(alert._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
  };
}

export default AlertList;