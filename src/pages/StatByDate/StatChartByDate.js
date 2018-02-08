import React from 'react'
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

class FilterDate extends React.Component {
  render() {
    const { data } = this.props
    return (
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <XAxis dataKey="schoolName" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="start" stackId="a" fill="#4CAF50" />
          <Bar dataKey="stop" stackId="a" fill="#F44336">
            <LabelList dataKey="schoolName" position="top" angle="45" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default FilterDate
