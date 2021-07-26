import React from 'react';
import axios from 'axios';
import './App.css';
import api from '../config/web';
import CreateAlert from './Alerts/CreateAlert';
import ListAlert from './Alerts/ListAlert';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
      symbols: []
    }
  }

  symbolListMethod = (input) =>{
    let list = [];
    input.forEach(function(item){
        list.push({value: item.symbol, label: item.symbol })
    })
    console.log(list);
    return list;
}

  componentDidMount() {

    

    axios.get(api.URI+"/getAllAlerts")
      .then((res) => {
        this.setState({
          alerts: res.data.alertList
        })
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get('https://api.binance.com/api/v1/exchangeInfo')
      .then((res)=> {
        let symbolList= [];
        res.data.symbols.forEach(function(item){
          symbolList.push({value: item.symbol, label: item.symbol })
        });
        this.setState({
          symbols: symbolList
        })
      })
      .catch((err) => {
        console.log(err);
      });
 
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a href="/" className="brand-logo">Trrader</a>
            </div>
          </nav>
        </div>
        <div className="row">
          {/* alert={this.state.alerts[0]} = This is provisory way to get creator id. 
          Once the user login is created we can get _id.creator from there. Create alert
          will only be accessible after someone login.  */}
          <div className="container"><CreateAlert alert={this.state.alerts[0] ? this.state.alerts[0]: 0  }  symbols={this.state.symbols}/></div>
          <div className="container"><ListAlert alerts={this.state.alerts}/></div>
        </div>
      </div>
    );
  }
}

export default App;
