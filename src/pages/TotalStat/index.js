import React from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import StatTable from './StatTable'
import StatChart from './StatChart'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  statChart: {
    marginRight: 10,
    padding: 20,
    height: 400,
    minWidth: 400,
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginBottom: 20,
    },
  },
})

@withStyles(styles)
class TotalStat extends React.PureComponent {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Paper
          className={classes.statChart}
        >
          <h3>Total Usage</h3>
          <StatChart />
        </Paper>
        <Paper>
          <StatTable />
        </Paper>
      </div>
    )
  }
}

export default TotalStat
