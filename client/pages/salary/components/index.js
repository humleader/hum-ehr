import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Icon, message, Popconfirm } from 'antd'
import Search from './search'
import moment from 'moment'
import List from './list'
import './index.less'

export default class ListTable extends React.Component {
  static propTypes = {
    salary: PropTypes.object.isRequired,
    location: PropTypes.object,
    action: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.querySearch()
  }

  querySearch = () => {
    const { action, salary } = this.props
    const { query } = action
    const { list } = salary.toJS()
    query({ createTime: moment(), ...list.params })
  }

  render() {
    var _self = this
    const { salary, action, user } = this.props
    const list = salary.get('list')
    const userList = user.get('list')
    const props = {
      name: 'file',
      action: '/hum/api/salary/save',
      showUploadList: false,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('_h_token')
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          if (info.file.response.code !== 0) {
            message.error(`文件上传失败！`)
          } else {
            message.success(`${info.file.name} file uploaded successfully`)
            _self.querySearch()
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
    return (
      <div className="m-content">
        <div className="box">
          <Upload {...props}>
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
              action.sendall().then(res => {
                message.success('已Check的邮件拼命发送ing，发送完成会收到邮件提醒，请注意查收噢！')
              })
            }}
          >
            <Button className="sent" type="primary">
              <Icon type="mail" />
              发送所有
            </Button>
          </Popconfirm>
        </div>

        {/* 查询条件 */}
        <Search action={action} list={list.toJS()} />

        {/* 列表 */}
        <List list={list} userList={userList} action={action} />
      </div>
    )
  }
}
