import React from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import Paper from 'material-ui/Paper'
import range from 'lodash/range'
import filter from 'lodash/filter'
import map from 'lodash/map'
import StatChartByDate from './StatChartByDate'

@inject('statStore')
@observer
class StatChartByDateList extends React.Component {
  render() {
    const { stat } = this.props.statStore
    const statByDate = map(range(10), n => {
      const date = moment()
        .startOf('days')
        .subtract(n, 'days')
      return {
        date: date.format('DD/MM/YYYY'),
        data: map(stat, (v, k) => {
          return {
            schoolName: k,
            start: filter(
              v.usage,
              x =>
                x.STARTDT !== undefined &&
                date.diff(
                  moment(
                    `${x.STARTDT.slice(4, 10)} ${x.STARTDT.slice(-4)}`,
                    'MMM DD YYYY',
                  ),
                  'days',
                ) === 0,
            ).length,
            stop: filter(
              v.usage,
              x =>
                x.STOPDT !== undefined &&
                date.diff(
                  moment(
                    `${x.STOPDT.slice(4, 10)} ${x.STOPDT.slice(-4)}`,
                    'MMM DD YYYY',
                  ),
                  'days',
                ) === 0,
            ).length,
          }
        }),
      }
    })
    return map(statByDate, x => (
      <Paper style={{ padding: 10, marginBottom: 10 }} key={x.date}>
        <h3>Date: {x.date}</h3>
        <StatChartByDate data={x.data} />
      </Paper>
    ))
  }
}

export default StatChartByDateList
