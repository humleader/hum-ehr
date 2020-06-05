import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Add from 'pages/employee/page/add'
import List from 'pages/employee/page/list'
import View from 'pages/employee/page/view'

class Company extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Add} path="/employee/add" />
        <Route exact component={Add} path="/employee/add/:id" />
        <Route exact component={View} path="/employee/view/:id" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Company
