import React from 'react'
import moment from 'moment'
import { Button, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'

const QueryList = props => {
  const { salary, action, common } = props
  const listSource = salary.get('listSource').toJS()
  const params = salary.get('params').toJS()
  const userList = common.get('list').toJS()

  const query = data => {
    return action.query(data)
  }

  const showName = id => {
    const list = userList
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.userAliasName : ''
  }

  const columns = [
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
        return showName(item)
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
  const formFields = [
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
        initialValue: moment()
      }
    }
  ]

  const onRowClick = record => {
    return {
      onClick: () => {
        history.push(`/salary/view/${record.id}`)
      }
    }
  }

  return (
    <div className="page-salary">
      <HumBreadcrumb item="工资管理" />
      <HumContainer className="salary-container">
        <HumQuery
          initParams={params}
          query={query}
          xForm={{
            formFields
          }}
          toolBar={
            <ToolBar>
              <Button type="primary">
                <Link to="/salary/add">新增</Link>
              </Button>
            </ToolBar>
          }
          xTable={{
            columns,
            onRow: onRowClick,
            scroll: { x: 1800 },
            dataSource: listSource
          }}
        />
      </HumContainer>
    </div>
  )
}

export default QueryList
