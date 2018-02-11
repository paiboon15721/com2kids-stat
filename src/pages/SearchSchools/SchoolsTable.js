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
import map from 'lodash/map'
import Loading from './Loading'
import { baseUrl } from '../../helpers/config'

const URL = `${baseUrl}/schools`

class SchoolsTable extends React.PureComponent {
  state = {
    columns: [
      { name: 'name', title: 'Name' },
      { name: 'province', title: 'Province' },
      { name: 'type', title: 'Type' },
      { name: 'size', title: 'Size' },
      { name: 'totalStudent', title: 'Total Student' },
      { name: 'totalTeacher', title: 'Total Teacher' },
      { name: 'usable', title: 'Usable' },
    ],
    rows: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 0,
    loading: true,
  }

  componentDidMount() {
    this.loadData(1)
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

  loadData = async (count = 0) => {
    const queryString = this.queryString()
    if (queryString === this.lastQuery) {
      this.setState({ loading: false })
      return
    }
    this.lastQuery = queryString
    try {
      const { data, headers } = await axios.get(`${queryString}&count=${count}`)
      const rows = map(data, v => ({
        name: v.name,
        province: v.province,
        type: v.type,
        size: v.size,
        totalStudent: v.totalStudent,
        totalTeacher: v.totalTeacher,
        usable: v.assets.computerTotal.usable,
      }))
      if (this.state.totalCount === 0) {
        this.setState({
          rows,
          totalCount: toInteger(headers['x-total-count']),
          loading: false,
        })
      } else {
        this.setState({
          rows,
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
