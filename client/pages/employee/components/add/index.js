import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

import FormAdd from '../form-add'
import FormEdit from '../form-edit'

class Add extends Component {
  static propTypes = {
    match: PropTypes.object,
    employee: PropTypes.object,
    company: PropTypes.object,
    user: PropTypes.object,
    common: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { match, action } = this.props
    const { id } = match.params || {}
    if (id) {
      action.queryById(match.params.id)
    }
    action.staffcode()
    action.queryToproject()
  }

  componentWillUnmount() {
    this.props.action.setEditData({
      fundStatus: '',
      nationality: 1,
      maritalStatus: '',
      deductionInfo: {}
    })
  }

  render() {
    const { match, employee, common, user, action, company } = this.props
    const { id } = match.params || ''
    const regionsDate = common.get('regionsDate')

    return (
      <div className="m-content m-employee-add">
        {id ? (
          <FormEdit
            employee={employee}
            company={company}
            regionsDate={regionsDate}
            user={user}
            action={action}
          />
        ) : (
          <FormAdd
            company={company}
            employee={employee}
            regionsDate={regionsDate}
            action={action}
          />
        )}
      </div>
    )
  }
}

export default Add
