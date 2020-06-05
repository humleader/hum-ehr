import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import ClassNames from 'classnames'

import './index.less'

const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'

const RangeData = props => {
  const { className, handleChange } = props
  const [active, setActive] = useState(0)
  const [rangestarttime, setRangestarttime] = useState(moment())
  const [rangeendtime, setRangeendtime] = useState(moment())
  const defaultValue = [rangestarttime, rangeendtime]

  useEffect(() => {
    handleChange({
      startTime: rangestarttime,
      endTime: rangeendtime
    })
    return () => {}
  }, [])

  const handleChangeDay = (val = 0) => {
    const params = {}
    const year = moment().year()
    let month = moment().month()

    month = month <= 9 ? `0${month + 1}` : month + 1

    switch (val) {
      case -1:
        params.startTime = moment().add(val, 'days')
        params.endTime = moment().add(val, 'days')
        break
      case 0:
        params.startTime = moment()
        params.endTime = moment()
        break
      case 1:
        params.startTime = moment().add(-moment().weekday(), 'days')
        params.endTime = moment()
        break
      case -2:
        params.startTime = moment(`${year}-${month}-01`)
        params.endTime = moment()
        break
      default:
        break
    }

    setActive(val)
    setRangestarttime(params.startTime)
    setRangeendtime(params.endTime)
    handleChange(params)
  }

  const handleChangeRange = val => {
    const params = {}
    if (val.length) {
      params.startTime = val[0]
      params.endTime = val[1]
      setActive('')
      setRangestarttime(params.startTime)
      setRangeendtime(params.endTime)
    } else {
      setActive('')
      setRangestarttime(null)
      setRangeendtime(null)
    }
    handleChange(params)
  }

  return (
    <div className={ClassNames('m-range-data', className)}>
      <span
        onClick={() => {
          handleChangeDay(-1)
        }}
        className={`itemday ${active === -1 && 'active'}`}
      >
        昨天
      </span>
      <span
        onClick={() => {
          handleChangeDay()
        }}
        className={`itemday ${active === 0 && 'active'}`}
      >
        今天
      </span>
      <span
        onClick={() => {
          handleChangeDay(1)
        }}
        className={`itemday ${active === 1 && 'active'}`}
      >
        本周
      </span>
      <span
        onClick={() => {
          handleChangeDay(-2)
        }}
        className={`itemday ${active === -2 && 'active'}`}
      >
        本月
      </span>
      <div className="rangepicker">
        <RangePicker
          value={defaultValue}
          allowClear
          onChange={val => {
            handleChangeRange(val)
          }}
          format={dateFormat}
        />
      </div>
    </div>
  )
}

export default RangeData
