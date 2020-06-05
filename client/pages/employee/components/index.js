import React from 'react'
import PropTypes from 'prop-types'

import Search from './search'
import List from './list'
import Detail from 'components/detail'

export default class ListTable extends React.Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { action, employee } = this.props
    const { query } = action
    const list = employee.get('list')
    const listtojs = list.toJS()
    query({ ...listtojs.params })
    action.staffcode()
  }

  render() {
    const { employee, action, user, common } = this.props
    const { staffcode } = employee.toJS()
    const list = employee.get('list')
    const userList = user.get('list')
    const modal = common.get('modal')

    return (
      <div className="m-content">
        {/* 查询条件 */}
        {staffcode.length > 0 && (
          <Search action={action} userList={userList.toJS()} staffcode={staffcode} list={list} />
        )}

        {/* 列表 */}
        <List list={list} userList={userList} action={action} />

        <Detail modal={modal} action={action} />
      </div>
    )
  }
}
