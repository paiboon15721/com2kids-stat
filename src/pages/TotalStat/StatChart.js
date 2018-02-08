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
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
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
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="start" stackId="a" fill="#4CAF50" />
          <Bar dataKey="stop" stackId="a" fill="#F44336">
            <LabelList dataKey="name" position="top" angle="45" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default StatChart
