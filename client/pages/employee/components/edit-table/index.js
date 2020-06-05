import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, DatePicker } from 'antd'
import './index.less'
import moment from 'moment'

class EditTable extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.any,
    readOnly: PropTypes.any
  }

  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      if (nextProps.isedit) {
        return {
          ...(nextProps.value || {})
        }
      } else {
        return {
          ...(state || {})
        }
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    const value = props.value || [{ name: '', idno: '', brithday: '' }]
    const temp = { paramList: value }
    this.state = {
      paramList: [{ name: '', idno: '', brithday: '' }],
      ...temp
    }
  }

  handleFieldValue = (item, index) => {
    const { paramList } = this.state
    paramList.splice(index, 1, item)
    this.triggerChange(paramList)
  }

  handlerRemoveField = index => {
    const { paramList } = this.state
    if (paramList.length > 1) {
      paramList.splice(index, 1)
      this.triggerChange(paramList)
    }
  }

  handlerAddField = () => {
    const { paramList } = this.state
    paramList.push({ name: '', idno: '', brithday: '' })
    this.triggerChange(paramList)
  }

  triggerChange = data => {
    const { onChange } = this.props
    this.setState(
      {
        paramList: data
      },
      () => {
        onChange(data, this.state)
      }
    )
  }

  inputJsx(param, index, level) {
    level = level || 0
    return (
      <div key={`param-${index}`} className="table-body table-line">
        <ul className="clearfix param-row">
          <li className="input">
            {this.props.readOnly ? (
              <span>{param.name}</span>
            ) : (
              <Input
                style={{ paddingLeft: `${10 + 20 * level}px` }}
                value={param.name}
                onChange={e => {
                  param.name = e.currentTarget.value
                  this.handleFieldValue(param, index)
                }}
              />
            )}
          </li>
          <li className="input">
            {this.props.readOnly ? (
              <span>{param.idno}</span>
            ) : (
              <Input
                value={param.idno}
                onChange={e => {
                  param.idno = e.currentTarget.value
                  this.handleFieldValue(param, index)
                }}
              />
            )}
          </li>
          <li className="input">
            {this.props.readOnly ? (
              <span>{param.brithday}</span>
            ) : (
              <DatePicker
                allowClear
                value={param.brithday ? moment(param.brithday) : undefined}
                format="YYYY-MM-DD"
                onChange={val => {
                  param.brithday = moment(val).format('YYYY-MM-DD')
                  this.handleFieldValue(param, index)
                }}
              />
            )}
          </li>
          {this.props.readOnly ? null : (
            <li className="operate-icons">
              <Icon
                type="plus-circle"
                onClick={() => {
                  this.handlerAddField()
                }}
              />
              <Icon
                type="minus-circle"
                onClick={() => {
                  this.handlerRemoveField(index)
                }}
              />
            </li>
          )}
        </ul>
      </div>
    )
  }

  render() {
    const paramList = this.state.paramList
    return (
      <div className="edit-table">
        <div className="table-header table-line">
          <ul className="clearfix">
            <li>姓名</li>
            <li>身份证</li>
            <li>出生日期</li>
            {this.props.readOnly ? null : <li>操作</li>}
          </ul>
        </div>
        {paramList.map((param, i) => {
          return this.inputJsx(param, i)
        })}
      </div>
    )
  }
}

export default EditTable
