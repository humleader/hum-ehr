import React, { useEffect } from 'react'
import moment from 'moment'
import { Divider, Tooltip, Button } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'

const QueryList = props => {
  const { employee, action, common } = props
  const { staffcode } = employee.toJS()
  const listSource = employee.get('listSource').toJS()
  const params = employee.get('params').toJS()
  const userList = common.get('list').toJS()

  useEffect(() => {
    action.staffcode()
    return () => {}
  }, [])
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
        return showName(item)
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
  const formFields = [
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

  const onRowClick = record => {
    return {
      onClick: () => {
        history.push(`/employee/view/${record.id}`)
      }
    }
  }

  return (
    <div className="page-employee">
      <HumBreadcrumb item="员工信息" />
      <HumContainer className="employee-container">
        <HumQuery
          initParams={params}
          query={query}
          xForm={{
            formFields
          }}
          toolBar={
            <ToolBar>
              <Button type="primary">
                <Link to="/employee/add">新增</Link>
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
