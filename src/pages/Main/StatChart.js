import React from 'react'
import { observer, inject } from 'mobx-react'
import map from 'lodash/map'
import filter from 'lodash/filter'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

@inject('statStore')
@observer
class StatChart extends React.Component {
  render() {
    const { stat } = this.props.statStore
    const data = map(stat, (v, k) => ({
      name: k,
      start: filter(v.usage, x => x.STARTDT !== undefined).length,
      stop: filter(v.usage, x => x.STOPDT !== undefined).length,
    }))
    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="start" stackId="a" fill="#8884d8" />
        <Bar dataKey="stop" stackId="a" fill="#82ca9d" />
      </BarChart>
    )
  }
}

export default StatChart
