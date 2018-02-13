import React from 'react'
import Paper from 'material-ui/Paper'
import SelectProvince from './SelectProvince'
import SelectComLess from './SelectComLess'
import SearchButton from './SearchButton'
import SearchName from './SearchName'

const styles = {
  root: { padding: 16 },
}

class FilterSchools extends React.PureComponent {
  render() {
    return (
      <Paper style={styles.root} className={this.props.className}>
        <SelectProvince />
        <SearchName />
        <SelectComLess />
        <SearchButton />
      </Paper>
    )
  }
}

export default FilterSchools
