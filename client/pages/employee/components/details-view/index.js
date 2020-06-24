import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './index.less'
import { Button, Form, Row, Col, Divider, Radio } from 'antd'
import EditTable from '../edit-table'

const { Fragment } = React

const FormItem = Form.Item

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

class Views extends Component {
  static propTypes = {
    form: PropTypes.object,
    employee: PropTypes.object,
    match: PropTypes.object,
    common: PropTypes.object,
    user: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      loginPending: false
    }
  }

  componentDidMount() {
    const { action } = this.props
    this.queryById()
    action.queryToproject()
  }

  componentWillUnmount() {
    this.props.action.setEditData({
      fundStatus: '',
      nationality: 1,
      maritalStatus: '',
      deductionInfo: {}
    })
  }

  queryById = () => {
    const { match } = this.props
    const { id } = match.params || {}
    const { queryById } = this.props.action
    if (id) {
      queryById(match.params.id)
    }
  }

  showCompany = (list, id) => {
    const ab = list.find(item => {
      return item.id === id
    })
    return ab ? ab.companyName : ''
  }

  render() {
    const { form, employee, company } = this.props
    const { editData } = employee.toJS()
    const { fundStatus, nationality, maritalStatus, deductionInfo = {} } = editData
    const { toproject } = company.toJS()

    const {
      continueEducation = {},
      houseLoan = {},
      houseRent = {},
      supportElderly = {},
      childEducation = {}
    } = deductionInfo

    const op = { 1: '未婚未育', 2: '已婚未育', 3: '已婚已育' }
    const fundStatusop = { 1: '有（封存）', 2: '有（原公司）', 0: '无' }

    const { getFieldDecorator } = form

    return (
      <div className="m-content m-employee-add">
        <Form className="addforms" onSubmit={this.handleSubmit}>
          <Row gutter={24} className="">
            <Col span={24} className="form-col">
              <div className="title">基本信息</div>
              <Divider className="dline" />
              <div className="line3">
                <FormItem className="add-formitem" {...formItemLayout30} label="员工编号">
                  {editData.staffCode}
                </FormItem>

                <FormItem className="add-formitem" {...formItemLayout30} label="所属客户">
                  {this.showCompany(toproject, editData.companyId)}
                </FormItem>

                <FormItem className="add-formitem" {...formItemLayout30} label="中文名">
                  {editData.chineseName}
                </FormItem>
              </div>

              <div className="line3">
                <FormItem className="add-formitem" {...formItemLayout30} label="英文名">
                  {editData.englishName}
                </FormItem>

                <FormItem className="add-formitem" {...formItemLayout30} label="昵称">
                  {editData.name}
                </FormItem>

                <FormItem className="add-formitem" {...formItemLayout30} label="婚育状况">
                  {op[editData.maritalStatus]}
                </FormItem>
              </div>

              <div className="line3">
                <FormItem className="add-formitem" {...formItemLayout30} label="性别">
                  {editData.gender ? '女' : '男'}
                </FormItem>

                <FormItem className="add-formitem" label="出生日期" {...formItemLayout30}>
                  {editData.birthday}
                </FormItem>

                <FormItem className="add-formitem" label="政治面貌" {...formItemLayout30}>
                  {editData.political}
                </FormItem>
              </div>

              <FormItem className="add-formitem" {...formItemLayout50} label="国籍">
                {editData.nationality === 1 ? '中国' : '外籍'}
              </FormItem>

              {nationality === 1 ? (
                <>
                  <FormItem className="add-formitem" label="身份ID" {...formItemLayout50}>
                    {editData.idNo}
                  </FormItem>
                  <FormItem className="add-formitem" label="户口性质" {...formItemLayout50}>
                    {editData.hukouType}
                  </FormItem>
                </>
              ) : (
                <>
                  <div className="line3">
                    <FormItem className="add-formitem" label="国家" {...formItemLayout30}>
                      {editData.country}
                    </FormItem>
                    <FormItem className="add-formitem" label="护照ID" {...formItemLayout30}>
                      {editData.idNo}
                    </FormItem>
                    <FormItem className="add-formitem" label="居住许可日期" {...formItemLayout30}>
                      {editData.passportTime}
                    </FormItem>
                  </div>
                </>
              )}
              {maritalStatus === 3 ? (
                <Fragment>
                  <div className="title">子女信息</div>
                  <Divider className="dline" />
                  <FormItem className="add-basis100" {...formItemLayout}>
                    {getFieldDecorator('educationInfo', {
                      initialValue: editData.educationInfo || [],
                      rules: []
                    })(
                      <EditTable
                        readOnly
                        onChange={val => {
                          console.log(val)
                        }}
                      />
                    )}
                  </FormItem>
                </Fragment>
              ) : null}

              <div className="title">联系住址</div>
              <Divider className="dline" />

              <FormItem className="add-formitem" label="联系方式" {...formItemLayout50}>
                {editData.contact}
              </FormItem>

              <FormItem className="add-formitem" label="邮箱" {...formItemLayout50}>
                {editData.Email}
              </FormItem>

              <FormItem className="add-formitem" label="紧急联系人" {...formItemLayout50}>
                {editData.emergencyContactName}
              </FormItem>

              <FormItem className="add-formitem" label="紧急人电话" {...formItemLayout50}>
                {editData.emergencyContactTel}
              </FormItem>

              <FormItem className="add-formitem" label="现居城市" {...formItemLayout50}>
                {editData.livingCity}
              </FormItem>

              <FormItem className="add-formitem" label="户籍城市" {...formItemLayout50}>
                {editData.residentialCity}
              </FormItem>

              <FormItem className="add-basis100" label="现居地址" {...formItemLayout}>
                {editData.livingAddress}
              </FormItem>

              <FormItem className="add-basis100" label="户籍地址" {...formItemLayout}>
                {editData.residentialAddress}
              </FormItem>

              <div className="title">公司信息</div>
              <Divider className="dline" />

              <FormItem className="add-formitem" label="开户行" {...formItemLayout50}>
                {editData.accountName}
              </FormItem>

              <FormItem className="add-formitem" label="银行卡号" {...formItemLayout50}>
                {editData.accountNo}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout50} label="薪资">
                {editData.basicSalary}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout50} label="工作状态">
                {editData.workStatus ? '在职' : '离职'}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout50} label="社保缴费城市">
                {editData.payCity}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout50} label="是否有社保">
                {editData.social ? '有' : '无'}
              </FormItem>

              <FormItem className="add-formitem" {...formItemLayout50} label="是否有公积金">
                {fundStatusop[fundStatus]}
              </FormItem>
              {fundStatus !== '' ? (
                <>
                  {fundStatus === 2 ? (
                    <>
                      <FormItem className="add-formitem" label="需缴存公司" {...formItemLayout50}>
                        {editData.fundCompany}
                      </FormItem>
                      <FormItem
                        className="add-formitem"
                        label="公司公积金账户"
                        {...formItemLayout50}
                      >
                        {editData.fundComNo}
                      </FormItem>
                      <FormItem
                        className="add-formitem"
                        label="个人公积金账户"
                        {...formItemLayout50}
                      >
                        {editData.fundNo}
                      </FormItem>
                    </>
                  ) : (
                    <FormItem className="add-formitem" label="个人公积金账户" {...formItemLayout50}>
                      {editData.fundNo}
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
                        disabled
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
                    {childEducation.val}
                  </FormItem>
                </>
              ) : (
                <FormItem className="add-basis100" label="子女教育" {...formItemLayout}>
                  {getFieldDecorator('childEducation', {
                    initialValue: childEducation.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      disabled
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
                        disabled
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
                    {supportElderly.val}
                  </FormItem>
                </>
              ) : (
                <FormItem className="add-basis100" label="赡养老人" {...formItemLayout}>
                  {getFieldDecorator('supportElderly', {
                    initialValue: supportElderly.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      disabled
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
                        disabled
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
                    {houseRent.val}
                  </FormItem>
                </>
              ) : (
                <FormItem className="add-basis100" label="住房租金" {...formItemLayout}>
                  {getFieldDecorator('houseRent', {
                    initialValue: houseRent.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      disabled
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
                        disabled
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
                    {houseLoan.val}
                  </FormItem>
                </>
              ) : (
                <FormItem className="add-basis100" label="住房房贷" {...formItemLayout}>
                  {getFieldDecorator('houseLoan', {
                    initialValue: houseLoan.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      disabled
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
                        disabled
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
                    {continueEducation.val}
                  </FormItem>
                </>
              ) : (
                <FormItem className="add-basis100" label="继续教育" {...formItemLayout}>
                  {getFieldDecorator('continueEducation', {
                    initialValue: continueEducation.key || 2,
                    rules: []
                  })(
                    <Radio.Group
                      disabled
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
                <Link to={`/employee/add/${editData.id}`}>
                  <Button type="primary" style={{ marginLeft: '20px' }}>
                    编辑
                  </Button>
                </Link>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Views)
