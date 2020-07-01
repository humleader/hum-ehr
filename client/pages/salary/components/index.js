import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Button, Popconfirm, Divider, Upload, Icon, message } from 'antd'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'
import DotStatus from 'components/dot-status'

const salaryMap = [
  {
    label: '已发送',
    value: 2,
    color: '#07C790'
  },
  {
    label: '待发送',
    value: 1,
    color: '#2db7f5'
  },
  {
    label: '未发送',
    value: 3,
    color: '#94989b'
  },
  {
    label: '发送失败',
    value: 4,
    color: '#f50'
  }
]

const QueryList = props => {
  const { salary, action, common } = props
  const listSource = salary.get('listSource').toJS()
  const params = salary.get('params').toJS()
  let historyParams = salary.get('historyParams')
  historyParams = historyParams && historyParams.toJS()
  const userList = common.get('userList').toJS()

  const [backParams, setBackParams] = useState({})

  useEffect(() => {
    if (historyParams) {
      setBackParams(historyParams)
      action.setHistoryParams(undefined)
    }
    return () => {}
  }, [])

  const query = data => {
    setBackParams(data)
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
        const { color, label } = salaryMap.find(res => res.value === item)

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
                action.setHistoryParams(backParams)
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
                  onCancel={e => {
                    e.stopPropagation()
                  }}
                  onConfirm={e => {
                    e.stopPropagation()
                    action.setHistoryParams(backParams)
                    action.delete({ id: record.id }).then(res => {
                      history.push(`/salary`)
                    })
                  }}
                >
                  <a
                    href="javascript:;"
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    删除
                  </a>
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
      dataIndex: 'name',
      formOptions: {
        initialValue: backParams.name
      }
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
          value: 4
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
      formOptions: {
        initialValue: backParams.sendStatus
      },
      dataIndex: 'sendStatus'
    },
    {
      title: '操作时间',
      type: 'month',
      dataIndex: 'createTime',
      placeholder: '选择月份',
      formOptions: {
        initialValue: backParams.createTime
      }
    }
  ]

  const onRowClick = record => {
    return {
      onClick: () => {
        action.setHistoryParams(backParams)
        history.push(`/salary/preview/${record.id}`)
      }
    }
  }

  const uploadProps = {
    name: 'file',
    action: '/ehr/api/salary/save',
    showUploadList: false,
    onChange: info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.code !== 0) {
          message.error(`文件上传失败！`)
        } else {
          message.success(`${info.file.name} file uploaded successfully`)
          query(params)
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <div className="page-salary">
      <HumBreadcrumb item="工资管理" />
      <HumContainer className="salary-container">
        <HumQuery
          params={params}
          historyParams={historyParams}
          query={query}
          xForm={{
            formFields
          }}
          toolBar={
            <ToolBar>
              <Upload {...uploadProps}>
                <Button type="primary">
                  <Icon type="upload" /> 上传薪资Excel
                </Button>
              </Upload>
              <Popconfirm
                placement="topRight"
                title={
                  <div>
                    <p>你确定要发送吗？</p>
                  </div>
                }
                onConfirm={() => {
                  action
                    .sendall()
                    .then(res => {
                      message.success('薪资单拼命发送ing，发送完成会收到邮件提醒，请注意查收噢！')
                    })
                    .catch(res => {
                      message.error(res.message)
                    })
                }}
              >
                <Button className="sent" type="primary">
                  <Icon type="mail" />
                  发送所有
                </Button>
              </Popconfirm>
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
