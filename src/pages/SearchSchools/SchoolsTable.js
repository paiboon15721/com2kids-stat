import React from 'react'
import Paper from 'material-ui/Paper'
import { inject, observer } from 'mobx-react'
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import map from 'lodash/map'
import Loading from './Loading'

@inject('schoolStore')
@observer
class SchoolsTable extends React.Component {
  columns = [
    { name: 'name', title: 'Name' },
    { name: 'province', title: 'Province' },
    { name: 'type', title: 'Type' },
    { name: 'size', title: 'Size' },
    { name: 'totalStudent', title: 'Total Student' },
    { name: 'totalTeacher', title: 'Total Teacher' },
    { name: 'usable', title: 'Usable' },
  ]

  changeCurrentPage = currentPage => {
    const { schoolStore } = this.props
    schoolStore.currentPage = currentPage
    schoolStore.fetchSchools()
  }

  render() {
    const {
      schools,
      totalCount,
      loading,
      currentPage,
      pageSize,
    } = this.props.schoolStore
    const rows = map(schools, v => ({
      name: v.name,
      province: v.province,
      type: v.type,
      size: v.size,
      totalStudent: v.totalStudent,
      totalTeacher: v.totalTeacher,
      usable: v.assets.computerTotal.usable,
    }))

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid rows={rows} columns={this.columns}>
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
