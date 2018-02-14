import React from 'react'
import Paper from 'material-ui/Paper'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import {
  PagingState,
  CustomPaging,
  RowDetailState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import Loading from './Loading'
import RowDetail from './RowDetail'

@inject('schoolStore')
@observer
class SchoolsTable extends React.Component {
  columns = [
    { name: 'name', title: 'Name' },
    { name: 'province', title: 'Province' },
    { name: 'type', title: 'Type' },
    { name: 'size', title: 'Size' },
    { name: 'totalStudent', title: 'Student' },
    { name: 'totalTeacher', title: 'Teacher' },
    { name: 'totalClassroom', title: 'Classroom' },
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
    const rows = schools || []
    return (
      <Paper style={{ position: 'relative' }}>
        <Grid rows={toJS(rows)} columns={this.columns}>
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
          />
          <CustomPaging totalCount={totalCount} />
          <RowDetailState />
          <Table />
          <TableHeaderRow />
          <TableRowDetail contentComponent={RowDetail} />
          <PagingPanel />
        </Grid>
        {loading && <Loading />}
      </Paper>
    )
  }
}

export default SchoolsTable
