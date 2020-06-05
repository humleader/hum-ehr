import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import List from 'pages/salary/page/list'
import Preview from './components/preview'

class Salary extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Preview} path="/salary/preview/:id" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Salary
