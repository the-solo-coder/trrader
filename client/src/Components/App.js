import React from 'react';
import axios from 'axios';
import './App.css';
import CreateAlert from './Alerts/CreateAlert';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:5000/api/create-alert';

    axios.get(url)
      .then((Response) => {
        this.setState({
          alerts: Response.data
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
          <div className="col s12"><CreateAlert alert={this.state.alerts} /></div>
        </div>
      </div>
    );
  }
}

export default App;
