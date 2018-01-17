import React from 'react'
import Paper from 'material-ui/Paper'
import StatTable from './StatTable'
import StatChart from './StatChart'

class TotalStat extends React.PureComponent {
  render() {
    return (
      <div>
        <Paper style={{ marginBottom: 20, padding: 20, height: 400 }}>
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
