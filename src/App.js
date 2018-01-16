import React from 'react'
import Button from 'material-ui/Button'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'

import fire from './helpers/fire'

class App extends React.PureComponent {
  componentDidMount() {
    fire
      .database()
      .ref('/')
      .on('value', s => {
        console.log(s.val())
      })
  }

  render() {
    return (
      <Grid
        rows={[
          { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
          { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
        ]}
        columns={[
          { name: 'id', title: 'ID' },
          { name: 'product', title: 'Product' },
          { name: 'owner', title: 'Owner' },
        ]}
      >
        <Table />
        <TableHeaderRow />
      </Grid>
    )
  }
}

export default App
