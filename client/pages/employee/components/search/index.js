import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import SearchForm from 'components/search-form'
import { Button } from 'antd'
import './index.less'

export default class Search extends Component {
  static propTypes = {
    action: PropTypes.object,
    userList: PropTypes.array,
    staffcode: PropTypes.any,
    list: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  formConfig = [
    {
      title: '姓名',
      type: 'input',
      placeholder: '请输入中英文或名字',
      dataIndex: 'name'
    },
    {
      title: '编号',
      type: 'select',
      placeholder: '请选择编号',
      dataIndex: 'staffCode',
      options: this.props.staffcode
    },
    {
      title: '缴费城市',
      type: 'input',
      placeholder: '请输入缴费城市',
      dataIndex: 'payCity'
    },
    {
      title: '工作状态',
      type: 'select',
      placeholder: '请选择',
      options: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '离职',
          value: 0
        },
        {
          label: '在职',
          value: 1
        }
      ],
      dataIndex: 'workStatus'
    },
    {
      title: '创建人',
      type: 'select',
      placeholder: '请选择创建人',
      dataIndex: 'addUserId',
      options: this.props.userList
    },
    {
      title: '更新时间',
      type: 'date',
      dataIndex: 'updateTime'
    }
  ]

  componentDidMount() {}

  handleClick = () => {
    history.push('/employee/add')
  }

  onSubmit = (err, values) => {
    const { action } = this.props
    if (!err) {
      values.pageIndex = 1
      action.query(values)
    }
  }

  render() {
    const { list } = this.props
    const { loading } = list.toJS()
    return (
      <div className="m-employee-search">
        <SearchForm
          loading={loading}
          decount={6}
          formConfig={this.formConfig}
          onSubmit={this.onSubmit}
        />
        <Button className="add-employee" type="primary" onClick={this.handleClick}>
          新增员工
        </Button>
      </div>
    )
  }
}
