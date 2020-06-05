import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import moment from 'moment'
import { Table, Popconfirm } from 'antd'
import './index.less'

export default class List extends Component {
  static propTypes = {
    list: PropTypes.object,
    userList: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      cardActionType: ''
    }
  }

  columns = [
    {
      title: '中文名字',
      width: '70px',
      dataIndex: 'chineseName',
      render: item => {
        return <div className="chineseName">{item}</div>
      }
    },
    {
      title: '英文名字',
      width: '90px',
      dataIndex: 'englishName'
    },
    {
      title: '邮箱',
      dataIndex: 'eMail'
    },
    {
      title: '薪资',
      dataIndex: 'basicSalary',
      render: item => {
        return `${item}元`
      }
    },
    {
      title: '发送人',
      dataIndex: 'sendUserId',
      width: '70px',
      render: item => {
        return this.showName(item)
      }
    },
    {
      title: 'check修改',
      width: '80px',
      render: (text, record) => {
        const str = []
        if (record.isLogo) {
          str.push('去logo')
        }
        if (record.isEn) {
          str.push('中文')
        }
        if (record.preMonth) {
          str.push('上个月')
        }
        return <span style={{ color: 'red' }}>{str.join(',')}</span>
      }
    },
    {
      title: '发送状态',
      width: '80px',
      dataIndex: 'sendStatus',
      render: type => {
        return (
          <span className={`tags tag${type}`}>
            {{ 0: '发送失败', 1: '待发送', 2: '已发送', 3: '未发送' }[type]}
          </span>
        )
      }
    },
    {
      title: '操作时间',
      dataIndex: 'updateTime',
      render: updateTime => {
        return moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        const { action } = this.props
        return (
          <span className="actions">
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                history.push(`/salary/preview/${record.id}`)
              }}
            >
              PDF预览
            </a>
            {record.sendStatus !== 2 ? (
              <Popconfirm
                placement="topRight"
                title={
                  <div>
                    <p>你确定要删除吗？</p>
                  </div>
                }
                onConfirm={() => {
                  action.delete({ id: record.id }).then(res => {
                    history.push(`/salary`)
                  })
                }}
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
            ) : null}
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

  componentDidMount() {}

  render() {
    const { list, action } = this.props

    const { loading, dataSource, params } = list.toJS()

    return (
      <Table
        rowKey="id"
        className="salary-table-list"
        loading={loading}
        columns={this.columns}
        dataSource={dataSource.rows}
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
