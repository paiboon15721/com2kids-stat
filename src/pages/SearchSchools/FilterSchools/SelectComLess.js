import React from 'react'
import { inject, observer } from 'mobx-react'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'

@inject('schoolStore')
@observer
class SelectComLess extends React.Component {
  handleChange = event => {
    this.props.schoolStore.q.comLess = event.target.value
  }

  render() {
    const { schoolStore, className } = this.props
    return (
      <FormControl className={className}>
        <InputLabel htmlFor="com-less">Com less than</InputLabel>
        <Select
          value={schoolStore.q.comLess}
          onChange={this.handleChange}
          inputProps={{ name: 'comLess', id: 'com-less' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

export default SelectComLess
