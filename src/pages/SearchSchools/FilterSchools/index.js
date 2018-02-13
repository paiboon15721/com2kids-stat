import React from 'react'
import Paper from 'material-ui/Paper'
import SelectProvince from './SelectProvince'
import SelectComLess from './SelectComLess'
import SearchButton from './SearchButton'

const styles = {
  root: { padding: 16 },
}

class FilterSchools extends React.PureComponent {
  render() {
    return (
      <Paper style={styles.root} className={this.props.className}>
        <form autoComplete="off">
          <SelectProvince />
          <SelectComLess />
          <SearchButton />
        </form>
      </Paper>
    )
  }
}

export default FilterSchools
