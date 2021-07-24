import React from 'react';
import axios from 'axios';
import './App.css';
import CreateAlert from './Alerts/CreateAlert';
import Header from './Header';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Footer from './Footer';

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
      <div class="wrapper" className="container-fluid">
        <div className="row">
          <Header/>
          <Menu/>
          <Dashboard/>
          
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a href="/" className="brand-logo">Trrader</a>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col s12"><CreateAlert alert={this.state.alerts} /></div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
