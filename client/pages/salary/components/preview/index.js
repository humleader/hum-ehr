import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Popconfirm, Switch } from 'antd'

import './index.less'

const Preview = props => {
  const { match, salary, action } = props
  const { id } = match.params || {}

  const { editData } = salary.toJS()
  const str = { 0: '待发送', 1: '待发送', 2: '已发送', 3: 'Check' }[editData.sendStatus] || 'Check'

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      action.queryById(id)
    }
    return () => {}
  }, [id])

  const onSwitchLogoChange = val => {
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

  const onSwitchEnChange = val => {
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

  const onSwitchChange = val => {
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

  const checkEmail = () => {
    const { editData } = salary.toJS()
    editData.sendStatus = 1
    action
      .check({
        id: editData.id,
        sendStatus: 1
      })
      .then(res => {
        action.setEditData(editData)
      })
  }

  return (
    <div className="preview">
      <div className="operation">
        {str === 'Check' ? (
          <Button onClick={checkEmail} className="check" type="primary">
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
              setLoading(true)
              action.send(editData).then(res => {
                setLoading(false)
                editData.sendStatus = 2
                action.setEditData(editData)
              })
            }}
          >
            <Button loading={loading} className="check" type="primary">
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
            onChange={onSwitchLogoChange}
          />
          <Switch
            defaultChecked={!editData.isEn}
            checked={!editData.isEn}
            checkedChildren="英文"
            unCheckedChildren="中文"
            onChange={onSwitchEnChange}
          />
          <Switch
            defaultChecked={!editData.preMonth}
            checked={!editData.preMonth}
            checkedChildren="当月"
            unCheckedChildren="上个月"
            onChange={onSwitchChange}
          />
        </div>
      </div>
      <iframe
        name="ifrmname"
        src={`/ehr/api/salary/preview?id=${id}`}
        width="100%"
        height="90%"
        frameBorder="0"
      />
    </div>
  )
}

function mapStateToProps(state) {
  const salary = state.salary
  return {
    salary
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
