import React, { useEffect } from 'react'
import { Spin } from 'antd'
import './index.less'
import Echarts from 'echarts'

const HomeChartBar = props => {
  const { data = {}, userList } = props

  const { dataSource, loading } = data

  const setOption = myChart => {
    const xAxisData = []
    const seriesData = []

    userList.forEach(item => {
      if (!item.status) {
        const curdata = dataSource.find(element => {
          return item.id === element.addUserId
        })
        if (curdata && curdata.length !== 0) {
          xAxisData.push(item.userAliasName)
          seriesData.push(curdata.count)
        } else {
          xAxisData.push(item.userAliasName)
          seriesData.push(0)
        }
      }
    })
    myChart.setOption({
      title: {
        text: '简历入录',
        textAlign: 'auto',
        textStyle: {
          color: '#444',
          fontSize: 16
        },
        left: '50%'
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '简历数',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: '#2db7f5'
            }
          },
          data: seriesData
        }
      ]
    })
  }

  useEffect(() => {
    if (!loading) {
      setOption(Echarts.init(document.getElementById('main')))
    }
    return () => {}
  }, [loading])

  return (
    <Spin spinning={loading}>
      <div id="main" className="chart-container" />
    </Spin>
  )
}

export default HomeChartBar
