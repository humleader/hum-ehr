import './index.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, message, Select } from 'antd'

const Option = Select.Option

const status = [
  {
    id: 4,
    value: '简历沟通'
  },
  {
    id: 0,
    value: '简历推荐'
  },
  {
    id: 1,
    value: '面试'
  },
  {
    id: 2,
    value: 'offer'
  },
  {
    id: 3,
    value: '入职'
  }
]

@Form.create()
class DetailForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    proList: PropTypes.array,
    action: PropTypes.object,
    currentRecord: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.handleSearch()
  }

  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.value || item.proName}
        </Option>
      )
    })
  }

  handleSearch = value => {
    const { action } = this.props
    const params = {
      proName: value
    }
    action.queryProName(params)
  }

  render() {
    const { form, currentRecord, proList } = this.props

    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
    return (
      <Form>
        <Form.Item {...formItemLayout} label="姓名：">
          {currentRecord.canName}
        </Form.Item>

        <Form.Item {...formItemLayout} label="项目：">
          {getFieldDecorator('proId', {
            initialValue: currentRecord.proId,
            rules: [{ required: true, message: '请选择' }]
          })(
            <Select
              showSearch
              disabled={!!currentRecord.proId}
              onSearch={this.handleSearch}
              filterOption={(input, option) => {
                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
              allowClear
              className="search-select"
              placeholder="请选择"
            >
              {this.renderOptions(proList)}
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="状态：">
          {getFieldDecorator('status', {
            initialValue: Number(currentRecord.status) || 4,
            rules: [{ required: true, message: '请选择状态' }]
          })(<Select>{this.renderOptions(status)}</Select>)}
        </Form.Item>
      </Form>
    )
  }
}

export default class Detail extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    callback: PropTypes.func,
    action: PropTypes.object.isRequired
  }

  onSubmit = e => {
    const { modal, action, callback } = this.props
    const { currentRecord } = modal.toJS()

    this.refs.form.validateFields((errors, data) => {
      if (!errors) {
        let temp = {}
        if (currentRecord.assId) {
          temp = {
            id: currentRecord.assId,
            status: data.status
          }
        } else {
          temp = {
            candidateId: currentRecord.id,
            ...data
          }
        }
        action.saveProCan(temp).then(() => {
          action.hideModal()
          message.success(`${currentRecord.assId ? '更新' : '推荐'}成功！`)
          callback && callback()
        })
      }
    })
  }

  render() {
    const { modal, action } = this.props
    const { currentRecord, loading, visible, proList } = modal.toJS()

    return (
      <Modal
        className="modal-form"
        title="推荐"
        visible={visible}
        confirmLoading={loading}
        onOk={this.onSubmit}
        onCancel={action.hideModal}
        maskClosable
        destroyOnClose
      >
        <DetailForm ref="form" action={action} proList={proList} currentRecord={currentRecord} />
      </Modal>
    )
  }
}
