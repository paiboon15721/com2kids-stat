import React from 'react'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import map from 'lodash/map'
import fpMap from 'lodash/fp/map'
import min from 'lodash/fp/min'
import pipe from 'lodash/fp/pipe'
import filter from 'lodash/fp/filter'
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
class NotUseStatChart extends React.Component {
  render() {
    const { stat } = this.props.statStore
    const date = moment().startOf('days')
    const data = map(stat, (v, k) => ({
      name: k,
      noUsedDays: pipe(
        filter(x => x.STOPDT !== undefined),
        fpMap(x =>
          date.diff(
            moment(
              `${x.STOPDT.slice(4, 10)} ${x.STOPDT.slice(-4)}`,
              'MMM DD YYYY',
            ),
            'days',
          ),
        ),
        min,
      )(v.usage),
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
          <Bar dataKey="noUsedDays" stackId="a" fill="#F44336">
            <LabelList dataKey="name" position="top" angle={45} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default NotUseStatChart
