import React from 'react'
import Paper from 'material-ui/Paper'
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import axios from 'axios'
import toInteger from 'lodash/toInteger'
import Loading from './Loading'

const URL = 'http://localhost:5000/schools'

class SchoolsTable extends React.PureComponent {
  state = {
    columns: [
      { name: 'name', title: 'Name' },
      { name: 'province', title: 'Province' },
      { name: 'type', title: 'Type' },
      { name: 'size', title: 'Size' },
      { name: 'totalStudent', title: 'Total Student' },
      { name: 'totalTeacher', title: 'Total Teacher' },
    ],
    rows: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 0,
    loading: true,
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate() {
    this.loadData()
  }

  changeCurrentPage = currentPage => {
    this.setState({
      loading: true,
      currentPage,
    })
  }

  queryString() {
    const { pageSize, currentPage } = this.state
    return `${URL}?limit=${pageSize}&skip=${pageSize * currentPage}`
  }

  loadData = async () => {
    const queryString = this.queryString()
    if (queryString === this.lastQuery) {
      this.setState({ loading: false })
      return
    }
    this.lastQuery = queryString
    try {
      const { data, headers } = await axios.get(queryString)
      if (this.state.totalCount === 0) {
        this.setState({
          rows: data,
          totalCount: toInteger(headers['x-total-count']),
          loading: false,
        })
      } else {
        this.setState({
          rows: data,
          loading: false,
        })
      }
    } catch (err) {
      this.setState({ loading: false })
    }
  }
  render() {
    const {
      rows,
      columns,
      pageSize,
      currentPage,
      totalCount,
      loading,
    } = this.state

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid rows={rows} columns={columns}>
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
          />
          <CustomPaging totalCount={totalCount} />
          <Table />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
        {loading && <Loading />}
      </Paper>
    )
  }
}

export default SchoolsTable
