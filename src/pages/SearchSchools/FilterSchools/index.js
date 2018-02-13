import React from 'react'
import Paper from 'material-ui/Paper'
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
  },
  searchName: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
  selectComLess: {
    width: '20%',
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
  },
  searchButton: {
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  },
})

@withStyles(styles)
class FilterSchools extends React.PureComponent {
  render() {
    const { classes, className } = this.props

    return (
      <Paper className={className}>
        <SelectProvince className={classes.selectProvince} />
        <SearchName className={classes.searchName} />
        <SelectComLess className={classes.selectComLess} />
        <SearchButton className={classes.SearchButton} />
      </Paper>
    )
  }
}

export default FilterSchools
