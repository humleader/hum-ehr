import React, { Component } from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Popconfirm, Switch } from 'antd'

class Preview extends Component {
  static propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    salary: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.queryById()
  }

  queryById = () => {
    const { match } = this.props
    const { id } = match.params || {}
    const { queryById } = this.props.action
    if (id) {
      queryById(match.params.id)
    }
  }

  componentWillUnmount() {}
  onSwitchLogoChange = val => {
    const { action, salary } = this.props
    const { editData } = salary.toJS()
    editData.isLogo = val ? 0 : 1
    action
      .check({
        id: editData.id,
        isLogo: val ? 0 : 1
      })
      .then(res => {
        action.setEditData(editData)
        document.all.ifrmname.contentWindow.location.reload()
      })
  }

  onSwitchEnChange = val => {
    const { action, salary } = this.props
    const { editData } = salary.toJS()
    editData.isEn = val ? 0 : 1
    action
      .check({
        id: editData.id,
        isEn: val ? 0 : 1
      })
      .then(res => {
        action.setEditData(editData)
        document.all.ifrmname.contentWindow.location.reload()
      })
  }

  onSwitchChange = val => {
    const { action, salary } = this.props
    const { editData } = salary.toJS()
    editData.preMonth = val ? 0 : 1
    action
      .check({
        id: editData.id,
        profile: editData.profile,
        preMonth: val ? 0 : 1
      })
      .then(res => {
        action.setEditData(editData)
        document.all.ifrmname.contentWindow.location.reload()
      })
  }

  checkEmail = () => {
    const { action, salary, user } = this.props
    const { editData } = salary.toJS()
    const { userInfo } = user.toJS()
    editData.checkUserId = userInfo.id
    editData.sendStatus = 1
    action
      .check({
        id: editData.id,
        checkUserId: userInfo.id,
        sendStatus: 1
      })
      .then(res => {
        action.setEditData(editData)
      })
  }

  render() {
    const { match, salary, action } = this.props
    const { id } = match.params || {}

    const { editData } = salary.toJS()
    const str =
      { 0: '待发送', 1: '待发送', 2: '已发送', 3: 'Check' }[editData.sendStatus] || 'Check'

    return (
      <div className="preview">
        <div className="operation">
          {str === 'Check' ? (
            <Button onClick={this.checkEmail} className="check" type="primary">
              {str}
            </Button>
          ) : str === '已发送' ? (
            <Button className="check" disabled type="primary">
              {str}
            </Button>
          ) : (
            <Popconfirm
              placement="topRight"
              title={
                <div>
                  <p>你确定要发送邮件吗？</p>
                </div>
              }
              onConfirm={() => {
                this.setState({
                  loading: true
                })
                action.send(editData).then(res => {
                  this.setState({
                    loading: false
                  })
                  editData.sendStatus = 2
                  action.setEditData(editData)
                })
              }}
            >
              <Button loading={this.state.loading} className="check" type="primary">
                {str}
              </Button>
            </Popconfirm>
          )}
          <div className="g-switch">
            <Switch
              defaultChecked={!editData.isLogo}
              checked={!editData.isLogo}
              checkedChildren="logo"
              unCheckedChildren="没logo"
              onChange={this.onSwitchLogoChange}
            />
            <Switch
              defaultChecked={!editData.isEn}
              checked={!editData.isEn}
              checkedChildren="英文"
              unCheckedChildren="中文"
              onChange={this.onSwitchEnChange}
            />
            <Switch
              defaultChecked={!editData.preMonth}
              checked={!editData.preMonth}
              checkedChildren="当月"
              unCheckedChildren="上个月"
              onChange={this.onSwitchChange}
            />
          </div>
        </div>
        <iframe
          name="ifrmname"
          src={`/hum/api/salary/preview?id=${id}`}
          width="100%"
          height="90%"
          frameBorder="0"
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const salary = state.salary
  const user = state.user
  return {
    salary,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.salary
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
