import React from 'react'

import './index.less'

import HumContainer from 'components/hum-container'
import RangeData from './range-data'
import Bar from './bar'

const HomeChart = props => {
  const { home, common, action } = props
  const list = home.get('list').toJS()
  const userList = common.get('list').toJS()

  const onHandleChange = async val => {
    // action.query(val)
  }

  return (
    <HumContainer className="page-home">
      <RangeData className="rangedata" handleChange={onHandleChange} />
      <Bar userList={userList} data={list} />
    </HumContainer>
  )
}

export default HomeChart
