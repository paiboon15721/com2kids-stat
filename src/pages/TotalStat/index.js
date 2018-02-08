import React from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import StatTable from './StatTable'
import StatChart from './StatChart'
import NotUseStatChart from './NotUseStatChart'

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
    padding: 20,
    height: 400,
    width: '49%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginRight: 0,
      marginBottom: 20,
    },
  },
  statTable: {
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      marginTop: 20,
    },
  },
})

@withStyles(styles)
class TotalStat extends React.PureComponent {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.statChart}>
          <h3>Total Usage</h3>
          <NotUseStatChart />
        </Paper>
        <Paper className={classes.statChart}>
          <h3>Total Usage</h3>
          <StatChart />
        </Paper>
        <Paper className={classes.statTable}>
          <StatTable />
        </Paper>
      </div>
    )
  }
}

export default TotalStat
