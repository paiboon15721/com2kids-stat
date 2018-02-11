import React from 'react'
import Paper from 'material-ui/Paper'
import SelectProvince from './SelectProvince'
import SearchButton from './SearchButton'

const styles = {
  root: { padding: 16 },
}

class FilterSchools extends React.PureComponent {
  render() {
    return (
      <Paper style={styles.root}>
        <SelectProvince />
        <SearchButton />
      </Paper>
    )
  }
}

export default FilterSchools
