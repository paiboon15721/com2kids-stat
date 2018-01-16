import React from 'react'
import Paper from 'material-ui/Paper'
import StatChartByDateList from './StatChartByDateList'

class StatBySchool extends React.PureComponent {
  render() {
    return (
      <Paper>
        <StatChartByDateList />
      </Paper>
    )
  }
}

export default StatBySchool
