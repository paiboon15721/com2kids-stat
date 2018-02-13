import React from 'react'
import TextField from 'material-ui/TextField'
import { inject, observer } from 'mobx-react'

@inject('schoolStore')
@observer
class SearchName extends React.Component {
  handleChange = event => {
    this.props.schoolStore.q.name = event.target.value
  }

  render() {
    return (
      <TextField
        id="name"
        label="Name"
        margin="normal"
        onChange={this.handleChange}
        value={this.props.schoolStore.q.name}
      />
    )
  }
}

export default SearchName
