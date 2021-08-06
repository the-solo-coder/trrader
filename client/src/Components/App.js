import React from 'react';
import MainNavigation from './Navigation/MainNavigation';
//Creating Routes
import {BrowserRouter as Router, Route, Redirect, Switch} from  'react-router-dom';

// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';


const App = () => {

// login and logout logic comes here in the future


return (
  <Router>
    <MainNavigation/>
    <main>
      <Switch>
      <Route path="/" exact><Home/></Route>
      <Route path="/login"><Login/></Route>
      </Switch>
    </main>

  </Router>
)};

export default App;

/* 
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
      pairs: [],
      price: 0
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

      axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      .then((res) => {
        this.setState({
          price: res.data.price
        })
        console.log(res.data.price)
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
      
      <Router>
       <MainNavigation/>
      <Switch>
      <Route path="/" exact><Home price={10}/></Route>
      <Route path="/login" exact><Login/></Route>
      <Route path="/registration" exact><Registration/></Route>
      <Route path="/account" exact><Account/></Route>
      <Route path="/alerts" exact><Alerts/></Route> 
      <Route path="/create-alerts" exact><AddAlert/></Route>
      <Route path="/update-alerts" exact>< UpdateAlert/></Route>
      <Route path="/balance" exact>< Balance/></Route>
        <Redirect to="/"/> 
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
      
      </Switch>
    </Router>
    ); 
  }
}

export default App;
 */