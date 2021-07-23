import React from 'react';
import axios from 'axios';
import './App.css';
import api from '../config/web';
import CreateAlert from './Alerts/CreateAlert';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: []
    }
  }

  componentDidMount() {
    axios.get(api.URI+"/getAllAlerts")
      .then((Response) => {
        this.setState({
          alerts: Response.data.alertList
        })
      })
      .catch((error) => {
        console.log(error);
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
          <div className="col s12"><CreateAlert alert={this.state.alerts[0]} /></div>
        </div>
      </div>
    );
  }
}

export default App;
