import React from 'react'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import map from 'lodash/map'
import filter from 'lodash/filter'
import size from 'lodash/size'

import fire from '../helpers/fire'

class StatTable extends React.PureComponent {
  state = {
    data: [],
  }

  componentDidMount() {
    fire
      .database()
      .ref('/')
      .on('value', s => {
        this.setState({
          data: map(s.val(), (v, k) => ({
            name: k,
            start: filter(v.usage, x => x.STARTDT !== undefined).length,
            stop: filter(v.usage, x => x.STOPDT !== undefined).length,
            total: size(v.usage),
          })),
        })
      })
  }

  render() {
    return (
      <Grid
        rows={this.state.data}
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
