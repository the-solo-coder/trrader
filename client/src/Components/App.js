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
      price: 0,
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
        let symbolList= [];
        res.data.
        .forEach(function(item){
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
          {/* alert={this.state.alerts[0]} = This is provisory way to get creator id. 
          Once the user login is created we can get _id.creator from there. Create alert
          will only be accessible after someone login.  */}
          <div className="container"><CreateAlert alert={this.state.alerts[0] ? this.state.alerts[0]: 0  }  symbols={this.state.symbols}/></div>
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