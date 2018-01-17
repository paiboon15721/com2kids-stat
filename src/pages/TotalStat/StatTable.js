import React from 'react'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import { observer, inject } from 'mobx-react'
import map from 'lodash/map'
import filter from 'lodash/filter'
import size from 'lodash/size'

@inject('statStore')
@observer
class StatTable extends React.Component {
  render() {
    const { stat } = this.props.statStore
    return (
      <Grid
        rows={map(stat, (v, k) => ({
          name: k,
          start: filter(v.usage, x => x.STARTDT !== undefined).length,
          stop: filter(v.usage, x => x.STOPDT !== undefined).length,
          total: size(v.usage),
        }))}
        columns={[
          { name: 'name', title: 'School name' },
          { name: 'start', title: 'Start' },
          { name: 'stop', title: 'Stop' },
          { name: 'total', title: 'Total' },
        ]}
      >
        <Table />
        <TableHeaderRow />
      </Grid>
    )
  }
}

export default StatTable
