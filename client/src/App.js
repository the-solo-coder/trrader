import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAlert from "./Components/Alerts/CreateAlert";
import Header from "./Components/Navigation/Header";
import Menu from "./Components/Navigation/Menu";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Navigation/Footer";
import AlertList from "./Components/Alerts/AlertList";
import Auth from "./Components/Auth/Auth";
import UpdateAlert from "./Components/Pages/UpdateAlert";

const App = () => {

  return (
      <Router>
        <Header />
        <Menu />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/alerts" exact>
              <AlertList />
            </Route>
            <Route path="/create-alert">
              <CreateAlert />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/alerts/update/:id">
              <UpdateAlert />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
  );
};

export default App;

// class App extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       alerts: []
//     }
//   }

//   componentDidMount() {
//     const url = 'http://localhost:5000/api/create-alert';

//     axios.get(url)
//       .then((Response) => {
//         this.setState({
//           alerts: Response.data
//         })
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//   };

//   render() {
//     return (
//       <div class="wrapper" className="container-fluid">
//         <div className="row">
//           <Header/>
//           <nav>
//             <div className="nav-wrapper blue darken-1">
//               <a href="/" className="brand-logo">Trrader</a>
//             </div>
//           </nav>
//         </div>
//         <div className="row">
//           <div className="col s12">
//             <CreateAlert alert={this.state.alerts} />
//           </div>
//         </div>
//         <Footer/>
//       </div>
//     );
//   }
// }
