import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Input, Select, message, DatePicker, Divider, Radio } from 'antd'
import history from 'common/history'
import staffCode from 'common/staffcode'
import EditTable from '../edit-table'
import moment from 'moment'

const { Fragment } = React

const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
const formItemLayout50 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
const formItemLayout30 = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 }
}
const formItemLayoutoffset = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

class FormEdit extends Component {
  static propTypes = {
    form: PropTypes.object,
    regionsDate: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      loginPending: false
    }
  }

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault()
    const { action, form, employee } = this.props
    const { editData } = employee.toJS()
    this.setState({
      loginPending: true
    })
    form.validateFields((err, values) => {
      if (err) {
        this.setState({
          loginPending: false
        })
        return
      }

      const temp = {
        ...editData,
        ...values
      }
      temp.educationInfo = JSON.stringify(temp.educationInfo)
      temp.deductionInfo = JSON.stringify(temp.deductionInfo)
      temp.updateTime = undefined
      action
        .save(temp)
        .then(() => {
          this.setState({
            loginPending: false
          })
          message.success(`修改成功！`)
          history.push('/employee')
        })
        .catch(res => {
          message.error(res.message)
          this.setState({
            loginPending: false
          })
        })
    })
  }

  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.label || item.companyName}
        </Option>
      )
    })
  }

  renderCityOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.shortName || item.id}>
          {item.shortName || item.userAliasName}
        </Option>
      )
    })
  }

  renderStaffCode = staffcode => {
    return staffcode.map((item, idx) => {
      return (
        <Option key={idx} value={`${item.codeName + staffCode(item.sCode, 4)}`}>
          {`${item.codeName}-${staffCode(item.sCode, 4)}`}
        </Option>
      )
    })
  }

  onChangefundStatus = val => {
    const { employee, action } = this.props
    const { editData } = employee.toJS()
    editData.fundStatus = val
    action.setEditData(editData)
  }

  onChangeCountry = val => {
    const { employee, action } = this.props
    const { editData } = employee.toJS()
    editData.nationality = val
    action.setEditData(editData)
  }

  onChangeMaritalStatus = val => {
    const { employee, action } = this.props
    const { editData } = employee.toJS()
    editData.maritalStatus = val
    action.setEditData(editData)
  }

  radioOnChange = (e, key1, key2) => {
    const val = e.target.value
    const { employee, action } = this.props
    const { editData } = employee.toJS()
    if (!editData.deductionInfo[key1]) {
      editData.deductionInfo[key1] = {}
    } else {
      if (val === 2) {
        editData.deductionInfo[key1].val = ''
      }
    }
    editData.deductionInfo[key1][key2] = val
    action.setEditData(editData)
  }

  render() {
    const { form, employee, company, regionsDate } = this.props
    const { staffcode, editData } = employee.toJS()
    const { fundStatus, nationality, maritalStatus, deductionInfo = {} } = editData
    const { toproject } = company.toJS()

    const {
      continueEducation = {},
      houseLoan = {},
      houseRent = {},
      supportElderly = {},
      childEducation = {}
    } = deductionInfo

    const { getFieldDecorator } = form

    return (
      <Form className="addforms" onSubmit={this.handleSubmit}>
        <Row gutter={24} className="">
          <Col span={24} className="form-col">
            <div className="title">基本信息</div>
            <Divider className="dline" />
            <FormItem className="add-formitem" {...formItemLayout50} label="员工编号">
              {getFieldDecorator('staffCode', {
                initialValue: editData.staffCode,
                rules: [{ required: true, message: '请选择员工编号' }]
              })(
                <Select
                  showSearch
                  disabled
                  placeholder="请选择"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.renderStaffCode(staffcode)}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="所属客户">
              {getFieldDecorator('companyId', {
                initialValue: editData.companyId,
                rules: [{ required: true, message: '请选择公司' }]
              })(
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="请选择公司"
                >
                  {this.renderOptions(toproject)}
                </Select>
              )}
            </FormItem>

            <div className="line3">
              <FormItem className="add-formitem" {...formItemLayout30} label="中文名">
                {getFieldDecorator('chineseName', {
                  initialValue: editData.chineseName,
                  rules: []
                })(<Input />)}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout30} label="英文名">
                {getFieldDecorator('englishName', {
                  initialValue: editData.englishName,
                  rules: []
                })(<Input />)}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout30} label="昵称">
                {getFieldDecorator('name', {
                  initialValue: editData.name,
                  rules: [{ required: true, message: '请填写昵称' }]
                })(<Input placeholder="请输入类似“Anthony”" />)}
              </FormItem>
            </div>

            <div className="line3">
              <FormItem className="add-formitem" {...formItemLayout30} label="性别">
                {getFieldDecorator('gender', {
                  initialValue: editData.gender,
                  rules: [{ required: true, message: '请选择性别' }]
                })(
                  <Select style={{ width: 200 }} placeholder="请选择">
                    <Option value={0}>男</Option>
                    <Option value={1}>女</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem className="add-formitem" label="出生日期" {...formItemLayout30}>
                {getFieldDecorator('birthday', {
                  initialValue: moment(editData.birthday, 'YYYY-MM-DD'),
                  rules: []
                })(<DatePicker />)}
              </FormItem>

              <FormItem className="add-formitem" label="政治面貌" {...formItemLayout30}>
                {getFieldDecorator('political', {
                  initialValue: editData.political,
                  rules: []
                })(<Input />)}
              </FormItem>
            </div>
            <FormItem className="add-formitem" {...formItemLayout50} label="婚育状况">
              {getFieldDecorator('maritalStatus', {
                initialValue: editData.maritalStatus,
                rules: [{ required: true, message: '请选择婚育状况' }]
              })(
                <Select
                  style={{ width: 200 }}
                  onChange={this.onChangeMaritalStatus}
                  placeholder="请选择"
                >
                  <Option value={1}>未婚未育</Option>
                  <Option value={2}>已婚未育</Option>
                  <Option value={3}>已婚已育</Option>
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="国籍">
              {getFieldDecorator('nationality', {
                initialValue: nationality,
                rules: [{ required: true, message: '请选择国籍' }]
              })(
                <Select style={{ width: 200 }} onChange={this.onChangeCountry} placeholder="请选择">
                  <Option value={1}>中国</Option>
                  <Option value={2}>外籍</Option>
                </Select>
              )}
            </FormItem>

            {nationality === 1 ? (
              <>
                <FormItem className="add-formitem" label="身份ID" {...formItemLayout50}>
                  {getFieldDecorator('idNo', {
                    initialValue: editData.idNo,
                    rules: []
                  })(<Input />)}
                </FormItem>
                <FormItem className="add-formitem" label="户口性质" {...formItemLayout50}>
                  {getFieldDecorator('hukouType', {
                    initialValue: editData.hukouType,
                    rules: []
                  })(<Input />)}
                </FormItem>
              </>
            ) : (
              <>
                <div className="line3">
                  <FormItem className="add-formitem" label="国家" {...formItemLayout30}>
                    {getFieldDecorator('country', {
                      initialValue: editData.country,
                      rules: []
                    })(<Input />)}
                  </FormItem>
                  <FormItem className="add-formitem" label="护照ID" {...formItemLayout30}>
                    {getFieldDecorator('idNo', {
                      initialValue: editData.idNo,
                      rules: []
                    })(<Input />)}
                  </FormItem>
                  <FormItem className="add-formitem" label="居住许可日期" {...formItemLayout30}>
                    {getFieldDecorator('passportTime', {
                      initialValue: moment(editData.passportTime, 'YYYY-MM-DD'),
                      rules: []
                    })(<DatePicker />)}
                  </FormItem>
                </div>
              </>
            )}
            {maritalStatus === 3 ? (
              <>
                <div className="title">子女信息</div>
                <Divider className="dline" />
                <FormItem className="add-basis100" {...formItemLayout}>
                  {getFieldDecorator('educationInfo', {
                    initialValue: editData.educationInfo || [],
                    rules: []
                  })(
                    <EditTable
                      onChange={val => {
                        console.log(val)
                      }}
                    />
                  )}
                </FormItem>
              </>
            ) : null}

            <div className="title">联系住址</div>
            <Divider className="dline" />

            <FormItem className="add-formitem" label="联系方式" {...formItemLayout50}>
              {getFieldDecorator('contact', {
                initialValue: editData.contact,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="邮箱" {...formItemLayout50}>
              {getFieldDecorator('Email', {
                initialValue: editData.Email,
                rules: []
              })(<Input type="email" />)}
            </FormItem>

            <FormItem className="add-formitem" label="紧急联系人" {...formItemLayout50}>
              {getFieldDecorator('emergencyContactName', {
                initialValue: editData.emergencyContactName,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="紧急人电话" {...formItemLayout50}>
              {getFieldDecorator('emergencyContactTel', {
                initialValue: editData.emergencyContactTel,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="现居城市" {...formItemLayout50}>
              {getFieldDecorator('livingCity', {
                initialValue: editData.livingCity,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="户籍城市" {...formItemLayout50}>
              {getFieldDecorator('residentialCity', {
                initialValue: editData.residentialCity,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-basis100" label="现居地址" {...formItemLayout}>
              {getFieldDecorator('livingAddress', {
                initialValue: editData.livingAddress,
                rules: [{}]
              })(<TextArea rows={2} />)}
            </FormItem>

            <FormItem className="add-basis100" label="户籍地址" {...formItemLayout}>
              {getFieldDecorator('residentialAddress', {
                initialValue: editData.residentialAddress,
                rules: [{}]
              })(<TextArea rows={2} />)}
            </FormItem>

            <div className="title">公司信息</div>
            <Divider className="dline" />

            <FormItem className="add-formitem" label="开户行" {...formItemLayout50}>
              {getFieldDecorator('accountName', {
                initialValue: editData.accountName,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="银行卡号" {...formItemLayout50}>
              {getFieldDecorator('accountNo', {
                initialValue: editData.accountNo,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="薪资">
              {getFieldDecorator('basicSalary', {
                initialValue: editData.basicSalary,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="工作状态">
              {getFieldDecorator('workStatus', {
                initialValue: editData.workStatus,
                rules: []
              })(
                <Select style={{ width: 200 }} placeholder="请选择">
                  <Option value={1}>在职</Option>
                  <Option value={0}>离职</Option>
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="社保缴费城市">
              {getFieldDecorator('payCity', {
                initialValue: editData.payCity,
                rules: []
              })(
                <Select
                  showSearch
                  placeholder="请选择城市"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.renderCityOptions(regionsDate.toJS())}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="是否有社保">
              {getFieldDecorator('social', {
                initialValue: editData.social,
                rules: []
              })(
                <Select style={{ width: 200 }} placeholder="请选择">
                  <Option value={1}>有</Option>
                  <Option value={0}>无</Option>
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="是否有公积金">
              {getFieldDecorator('fundStatus', {
                initialValue: editData.fundStatus,
                rules: []
              })(
                <Select
                  style={{ width: 200 }}
                  onChange={this.onChangefundStatus}
                  placeholder="请选择"
                >
                  <Option value={1}>有（封存）</Option>
                  <Option value={2}>有（原公司）</Option>
                  <Option value={0}>无</Option>
                </Select>
              )}
            </FormItem>
            {fundStatus !== '' ? (
              <>
                {fundStatus === 2 ? (
                  <>
                    <FormItem className="add-formitem" label="需缴存公司" {...formItemLayout50}>
                      {getFieldDecorator('fundCompany', {
                        initialValue: editData.fundCompany,
                        rules: []
                      })(<Input />)}
                    </FormItem>
                    <FormItem className="add-formitem" label="公司公积金账户" {...formItemLayout50}>
                      {getFieldDecorator('fundComNo', {
                        initialValue: editData.fundComNo,
                        rules: []
                      })(<Input />)}
                    </FormItem>
                    <FormItem className="add-formitem" label="个人公积金账户" {...formItemLayout50}>
                      {getFieldDecorator('fundNo', {
                        initialValue: editData.fundNo,
                        rules: []
                      })(<Input />)}
                    </FormItem>
                  </>
                ) : (
                  <FormItem className="add-formitem" label="个人公积金账户" {...formItemLayout50}>
                    {getFieldDecorator('fundNo', {
                      initialValue: editData.fundNo,
                      rules: []
                    })(<Input />)}
                  </FormItem>
                )}
              </>
            ) : null}

            <div className="title">专项扣除</div>
            <Divider className="dline" />

            {childEducation.key === 1 ? (
              <>
                <FormItem className="add-formitem" label="子女教育" {...formItemLayout50}>
                  {getFieldDecorator('childEducation', {
                    initialValue: childEducation.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      onChange={e => {
                        this.radioOnChange(e, 'childEducation', 'key')
                      }}
                    >
                      <Radio value={1}>有</Radio>
                      <Radio value={2}>无</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
                <FormItem className="add-formitem" label="子女教育额度" {...formItemLayout50}>
                  {getFieldDecorator('childEducationval', {
                    initialValue: childEducation.val,
                    rules: []
                  })(
                    <Input
                      onChange={e => {
                        this.radioOnChange(e, 'childEducation', 'val')
                      }}
                    />
                  )}
                </FormItem>
              </>
            ) : (
              <FormItem className="add-basis100" label="子女教育" {...formItemLayout}>
                {getFieldDecorator('childEducation', {
                  initialValue: childEducation.key || 2,
                  rules: []
                })(
                  <Radio.Group
                    onChange={e => {
                      this.radioOnChange(e, 'childEducation', 'key')
                    }}
                  >
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            )}

            {supportElderly.key === 1 ? (
              <>
                <FormItem className="add-formitem" label="赡养老人" {...formItemLayout50}>
                  {getFieldDecorator('supportElderly', {
                    initialValue: supportElderly.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      onChange={e => {
                        this.radioOnChange(e, 'supportElderly', 'key')
                      }}
                    >
                      <Radio value={1}>有</Radio>
                      <Radio value={2}>无</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
                <FormItem className="add-formitem" label="赡养老人额度" {...formItemLayout50}>
                  {getFieldDecorator('supportElderlyval', {
                    initialValue: supportElderly.val,
                    rules: []
                  })(
                    <Input
                      onChange={e => {
                        this.radioOnChange(e, 'supportElderly', 'val')
                      }}
                    />
                  )}
                </FormItem>
              </>
            ) : (
              <FormItem className="add-basis100" label="赡养老人" {...formItemLayout}>
                {getFieldDecorator('supportElderly', {
                  initialValue: supportElderly.key || 2,
                  rules: []
                })(
                  <Radio.Group
                    onChange={e => {
                      this.radioOnChange(e, 'supportElderly', 'key')
                    }}
                  >
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            )}

            {houseRent.key === 1 ? (
              <>
                <FormItem className="add-formitem" label="住房租金" {...formItemLayout50}>
                  {getFieldDecorator('houseRent', {
                    initialValue: houseRent.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      onChange={e => {
                        this.radioOnChange(e, 'houseRent', 'key')
                      }}
                    >
                      <Radio value={1}>有</Radio>
                      <Radio value={2}>无</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
                <FormItem className="add-formitem" label="住房租金额度" {...formItemLayout50}>
                  {getFieldDecorator('houseRentval', {
                    initialValue: houseRent.val,
                    rules: []
                  })(
                    <Input
                      onChange={e => {
                        this.radioOnChange(e, 'houseRent', 'val')
                      }}
                    />
                  )}
                </FormItem>
              </>
            ) : (
              <FormItem className="add-basis100" label="住房租金" {...formItemLayout}>
                {getFieldDecorator('houseRent', {
                  initialValue: houseRent.key || 2,
                  rules: []
                })(
                  <Radio.Group
                    onChange={e => {
                      this.radioOnChange(e, 'houseRent', 'key')
                    }}
                  >
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            )}

            {houseLoan.key === 1 ? (
              <>
                <FormItem className="add-formitem" label="住房房贷" {...formItemLayout50}>
                  {getFieldDecorator('houseLoan', {
                    initialValue: houseLoan.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      onChange={e => {
                        this.radioOnChange(e, 'houseLoan', 'key')
                      }}
                    >
                      <Radio value={1}>有</Radio>
                      <Radio value={2}>无</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
                <FormItem className="add-formitem" label="住房房贷额度" {...formItemLayout50}>
                  {getFieldDecorator('houseLoanval', {
                    initialValue: houseLoan.val,
                    rules: []
                  })(
                    <Input
                      onChange={e => {
                        this.radioOnChange(e, 'houseLoan', 'val')
                      }}
                    />
                  )}
                </FormItem>
              </>
            ) : (
              <FormItem className="add-basis100" label="住房房贷" {...formItemLayout}>
                {getFieldDecorator('houseLoan', {
                  initialValue: houseLoan.key || 2,
                  rules: []
                })(
                  <Radio.Group
                    onChange={e => {
                      this.radioOnChange(e, 'houseLoan', 'key')
                    }}
                  >
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            )}

            {continueEducation.key === 1 ? (
              <>
                <FormItem className="add-formitem" label="继续教育" {...formItemLayout50}>
                  {getFieldDecorator('continueEducation', {
                    initialValue: continueEducation.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      onChange={e => {
                        this.radioOnChange(e, 'continueEducation', 'key')
                      }}
                    >
                      <Radio value={1}>有</Radio>
                      <Radio value={2}>无</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
                <FormItem className="add-formitem" label="继续教育额度" {...formItemLayout50}>
                  {getFieldDecorator('continueEducationval', {
                    initialValue: continueEducation.val,
                    rules: []
                  })(
                    <Input
                      onChange={e => {
                        this.radioOnChange(e, 'continueEducation', 'val')
                      }}
                    />
                  )}
                </FormItem>
              </>
            ) : (
              <FormItem className="add-basis100" label="继续教育" {...formItemLayout}>
                {getFieldDecorator('continueEducation', {
                  initialValue: continueEducation.key || 2,
                  rules: []
                })(
                  <Radio.Group
                    onChange={e => {
                      this.radioOnChange(e, 'continueEducation', 'key')
                    }}
                  >
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem {...formItemLayoutoffset}>
              <Link to="/employee">
                <Button type="default" style={{ width: '100px' }}>
                  取消
                </Button>
              </Link>
              <Button
                type="primary"
                loading={this.state.loginPending}
                style={{ width: '100px', marginLeft: '20px' }}
                htmlType="submit"
              >
                确定
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(FormEdit)
