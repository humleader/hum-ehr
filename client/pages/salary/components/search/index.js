import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchForm from 'components/search-form'
import moment from 'moment'
import './index.less'

export default class Search extends Component {
  static propTypes = {
    action: PropTypes.object,
    list: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  formConfig = [
    {
      title: '员工姓名',
      type: 'input',
      placeholder: '输入员工中文或英文名字',
      dataIndex: 'name'
    },
    {
      title: '发送状态',
      type: 'select',
      placeholder: '请选择',
      options: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '发送失败',
          value: 0
        },
        {
          label: '待发送',
          value: 1
        },
        {
          label: '已发送',
          value: 2
        },
        {
          label: '未发送',
          value: 3
        }
      ],
      dataIndex: 'sendStatus'
    },
    {
      title: '操作时间',
      type: 'month',
      dataIndex: 'createTime',
      formOptions: {
        initialValue: this.props.list.params.createTime || moment()
      }
    }
  ]

  componentDidMount() {}

  onSubmit = (err, values) => {
    const { action } = this.props
    if (!err) {
      values.pageIndex = 1
      action.query(values)
    }
  }

  render() {
    const { list } = this.props
    const { loading } = list
    return (
      <div className="m-salary-search">
        <SearchForm loading={loading} formConfig={this.formConfig} onSubmit={this.onSubmit} />
      </div>
    )
  }
}
