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
      pairs: []
    }
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
        this.setState({
          pairs: res.data.symbols
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
          <div className="container"><CreateAlert alert={this.state.alerts[0]}  pairs={this.state.pairs}/></div>
          <div className="container"><ListAlert alerts={this.state.alerts}/></div>
        </div>
      </div>
    );
  }
}

export default App;
