import React from 'react'
import Paper from 'material-ui/Paper'
import { inject } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import SelectProvince from './SelectProvince'
import SelectComLess from './SelectComLess'
import SearchButton from './SearchButton'
import SearchName from './SearchName'

const styles = theme => ({
  selectProvince: {
    minWidth: 200,
    width: '20vw',
    [theme.breakpoints.down('md')]: {
      width: '40vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70vw',
      alignSelf: 'center',
    },
  },
  searchName: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  selectComLess: {
    width: '20%',
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      width: '80%',
    },
  },
  searchButton: {
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
})

@withStyles(styles)
@inject('schoolStore')
class FilterSchools extends React.PureComponent {
  fetchSchools = e => {
    e.preventDefault()
    this.props.schoolStore.fetchSchools(1)
  }

  render() {
    const { classes, className } = this.props

    return (
      <Paper>
        <form className={className} onSubmit={this.fetchSchools}>
          <SelectProvince className={classes.selectProvince} />
          <SearchName className={classes.searchName} />
          <SelectComLess className={classes.selectComLess} />
          <SearchButton className={classes.searchButton} />
        </form>
      </Paper>
    )
  }
}

export default FilterSchools
