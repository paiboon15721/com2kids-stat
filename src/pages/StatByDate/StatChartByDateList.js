import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'
import Paper from 'material-ui/Paper'
import range from 'lodash/range'
import filter from 'lodash/filter'
import map from 'lodash/map'
import StatChartByDate from './StatChartByDate'

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexFlow: 'column nowrap',
    },
  },
  statChart: {
    boxSizing: 'border-box',
    padding: 10,
    height: 400,
    width: '49%',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
})

@withStyles(styles)
@withRouter
@inject('statStore')
@observer
class StatChartByDateList extends React.Component {
  renderStatList() {
    const { statStore, match, classes } = this.props
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
      <Paper className={classes.statChart} key={x.date}>
        <h3>Date: {x.date}</h3>
        <StatChartByDate data={x.data} />
      </Paper>
    ))
  }

  render() {
    const { classes } = this.props
    return <div className={classes.root}>{this.renderStatList()}</div>
  }
}

export default StatChartByDateList
