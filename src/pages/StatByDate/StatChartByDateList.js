import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Paper from 'material-ui/Paper'
import range from 'lodash/range'
import filter from 'lodash/filter'
import map from 'lodash/map'
import StatChartByDate from './StatChartByDate'

@withRouter
@inject('statStore')
@observer
class StatChartByDateList extends React.Component {
  render() {
    const { statStore, match } = this.props
    const back = match.params.back || 10
    const statByDate = map(range(back), n => {
      const date = moment()
        .startOf('days')
        .subtract(n, 'days')
      return {
        date: date.format('ddd DD/MM/YYYY'),
        data: map(statStore.stat, (v, k) => {
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
      <Paper
        style={{ padding: 10, marginBottom: 10, height: 400 }}
        key={x.date}
      >
        <h3>Date: {x.date}</h3>
        <StatChartByDate data={x.data} />
      </Paper>
    ))
  }
}

export default StatChartByDateList
