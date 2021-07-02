import React, { Component }  from 'react';
import AdminLTE, { Sidebar } from 'adminlte-2-react';
//import axios from 'axios';
import Home from './Home';

import './App.css';
import CreateAlert from './Alerts/CreateAlert';
import ListAlert from './Alerts/ListAlert';
import UpdateAlert from './Alerts/UpdateAlert';


const { Item, UserPanel, Header } = Sidebar;


export default class App extends Component {

 /* constructor(props) {
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
*/
  getURL(value) {
    switch (value) {
      
        case "home": return "/Home";
        case "createAlert": return "/Alerts/CreateAlert";
        case "listAlert": return "/Alerts/ListAlert";
        case "updateAlert": return "/Alerts/UpdateAlert";

        default: return "/Home";
    }
}
  sidebar = [
    <Header text="User Profile" />,
    <UserPanel
        username="Trrader User"
       // imageUrl="https://i.pinimg.com/originals/8d/ec/f9/8decf9caed777b8d0d698e01270ce308.png"
        status="Online" />,
    <Header text="Navigation" />,
    <Item key="Home" text="Home" to={this.getURL("home")} icon="fa-home" browserTitle="Home" />,
    
    <Item key="Alerts" text="Alerts" icon="fa-bell">
        <Item key="CreateAlert" text="Create Alert" to={this.getURL("createAlert")} icon="fa-plus" />       
        <Item key="ListAlert" text="List Alert" to={this.getURL("listAlert")} icon="fa-list" />
</Item>
    
]
  render() {
    return (
      <AdminLTE title={["Trrader"]} titleShort={["T"]} theme="blue" sidebar={this.sidebar} browserTitle="Home" homeTo="./Home">
        
        {/* Main Navigation */}
        <Home path={this.getURL("home")} />

          {/* Alerts */}
          <CreateAlert path={this.getURL("createAlert")} />
          <ListAlert path={this.getURL("listAlert")} />
          <UpdateAlert path={this.getURL("updateAlert")} />


    </AdminLTE>
    );
  }
}