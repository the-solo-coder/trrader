import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateAlert from './Components/Alerts/CreateAlert'
import Header from './Components/Navigation/Header'
import Menu from './Components/Navigation/Menu'
import Home from './Components/Pages/Home'
import Footer from './Components/Navigation/Footer'
import AlertList from './Components/Alerts/AlertList'
import ComingSoon from './Components/Pages/ComingSoon'

const App = () => {
  // login and logout logic comes here in the future

  return (
    <Router>
      <Header />
      <Menu />
      <main>
        <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/alerts"><AlertList/></Route>
        <Route path="/create-alert"><CreateAlert/></Route>
        <Route path="/alerts/:id"><CreateAlert/></Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/alerts">
            <AlertList />
          </Route>
          <Route path="/create-alert">
            <CreateAlert />
          </Route>
          <Route path="/comingSoon">
            <ComingSoon />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
