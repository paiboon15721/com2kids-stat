import React from 'react'
import { withStyles } from 'material-ui/styles'
import FilterSchools from './FilterSchools'
import SchoolsTable from './SchoolsTable'

const styles = theme => ({
  filterSchools: {
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'row wrap',
    padding: 16,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
})

@withStyles(styles)
class SearchSchools extends React.PureComponent {
  render() {
    const { classes } = this.props
    return (
      <div style={{ boxSizing: 'border-box' }}>
        <FilterSchools className={classes.filterSchools} />
        <SchoolsTable />
      </div>
    )
  }
}

export default SearchSchools
