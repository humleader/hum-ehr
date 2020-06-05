import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import moment from 'moment'
import { Table } from 'antd'
import './index.less'

export default class List extends Component {
  static propTypes = {
    list: PropTypes.object,
    userList: PropTypes.object,
    toproject: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  columns = [
    {
      title: '编号',
      dataIndex: 'staffCode'
    },
    {
      title: '中文名',
      dataIndex: 'chineseName'
    },
    {
      title: '英文名',
      dataIndex: 'englishName'
    },
    {
      title: '名字',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: item => {
        return item ? '女' : '男'
      }
    },
    {
      title: '现居城市',
      dataIndex: 'livingCity'
    },
    {
      title: '联系方式',
      dataIndex: 'contact'
    },
    {
      title: '邮箱',
      dataIndex: 'Email'
    },
    {
      title: '工作状态',
      dataIndex: 'workStatus',
      render: item => {
        return item ? '在职' : '离职'
      }
    },
    // {
    //   title: '创建人',
    //   dataIndex: 'addUserId',
    //   render: item => {
    //     return this.showName(item)
    //   }
    // },
    {
      title: '修改人',
      dataIndex: 'lastUpdateUserId',
      render: item => {
        return this.showName(item)
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: updateTime => {
        return moment(updateTime).format('YYYY-MM-DD')
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        // const { action } = this.props
        return (
          <span>
            <a
              onClick={e => {
                e.stopPropagation()
                history.push(`/employee/add/${record.id}`)
              }}
            >
              编辑
            </a>
          </span>
        )
      }
    }
  ]

  showName = id => {
    const { userList } = this.props
    const list = userList.toJS()
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.userAliasName : ''
  }

  showCompanyName = id => {
    const { toproject } = this.props
    const list = toproject.toJS()
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.companyName : ''
  }

  onRowClick = record => {
    return {
      onClick: () => {
        history.push(`/employee/view/${record.id}`)
      }
    }
  }

  componentDidMount() {}

  render() {
    const { list, action } = this.props

    const { loading, dataSource, params } = list.toJS()

    return (
      <Table
        rowKey="id"
        className="table-list"
        loading={loading}
        onRow={this.onRowClick}
        columns={this.columns}
        dataSource={dataSource.rows}
        // scroll={{ x: 1300 }}
        pagination={{
          total: dataSource.count,
          pageSize: params.pageSize,
          current: params.pageIndex,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
          onChange: pageIndex => action.query({ ...params, pageIndex })
        }}
      />
    )
  }
}
