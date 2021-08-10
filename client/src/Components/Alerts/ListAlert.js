import React from 'react';

const ListAlert = props => {

    if(props.alerts.length === 0){
        return (
            <div class="card card-primary card-outline">
                <div class="card-body">
                <h5 class="card-title">No alerts found.</h5>
                </div>
            </div>
        );
    }

    return (
    <div>
       {props.alerts.map(alert =>(
        <div className="card card-primary card-outline" key={alert._id}>
            <div className="card-body">
                <h5 className="card-title">Symbol: {alert.symbol}</h5>
                <p className="card-text">
                  Send me a email if price is {alert.condition === 1 ? 'more than' : 'less than'} {alert.value}.
                </p>
                <a href="/" className="card-link">Edit</a>
                <a href="/" className="card-link">Delete</a>
            </div>
        </div>
       ))} 
       </div>
    );
};

export default ListAlert;