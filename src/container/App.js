import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import DashboardPage from "../pages/DashboardPage"
import HomePage from "../pages/HomePage"
import ConnectPage from '../pages/ConnectPage'

const App = ({ user }) => {

  return (
    <React.Fragment>
      <div className="App">
        {!user.connected ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/connect" component={ConnectPage} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/dashboard" component={DashboardPage} />
            <Redirect to="/dashboard" />
          </Switch>
        )}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);