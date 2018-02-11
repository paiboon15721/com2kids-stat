import React from 'react'
import Paper from 'material-ui/Paper'
import SelectProvince from './SelectProvince'

class FilterSchools extends React.PureComponent {
  render() {
    return (
      <Paper>
        <SelectProvince />
      </Paper>
    )
  }
}

export default FilterSchools
