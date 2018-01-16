import React from 'react'
import { observer, inject } from 'mobx-react'
import StatChartByDate from './StatChartByDate'

@inject('statStore')
@observer
class StatChartByDateList extends React.Component {
  render() {
    return <StatChartByDate />
  }
}

export default StatChartByDateList
