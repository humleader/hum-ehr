import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Button, Popconfirm, Divider } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'
import DotStatus from 'components/dot-status'

const salaryMap = [
  {
    label: '发送失败',
    value: 0,
    color: '#357BFF'
  },
  {
    label: '待发送',
    value: 1,
    color: '#ff7000'
  },
  {
    label: '已发送',
    value: 2,
    color: '#07C790'
  },
  {
    label: '未发送',
    value: 3,
    color: '#EF6555'
  }
]

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
      dataIndex: 'chineseName',
      render: item => {
        return <div className="overflow-ellipsis">{item}</div>
      }
    },
    {
      title: '英文名字',
      dataIndex: 'englishName',
      render: item => {
        return <div className="overflow-ellipsis">{item}</div>
      }
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
      render: item => {
        return showName(item)
      }
    },
    {
      title: 'check修改',
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
      width: '140px',
      dataIndex: 'sendStatus',
      render: item => {
        const { color, label } = salaryMap[item]

        return <DotStatus color={color} text={label} />
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
              <Fragment>
                <Divider type="vertical" />
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
              </Fragment>
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
      placeholder: '选择月份',
      formOptions: {
        initialValue: params.createTime
      }
    }
  ]

  const onRowClick = record => {
    return {
      onClick: () => {
        history.push(`/salary/preview/${record.id}`)
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
            dataSource: listSource
          }}
        />
      </HumContainer>
    </div>
  )
}

function mapStateToProps(state) {
  const salary = state.salary
  const common = state.common
  return {
    salary,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.salary
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryList)
