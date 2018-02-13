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
    const { schoolStore, className } = this.props
    return (
      <TextField
        className={className}
        id="name"
        label="Name"
        onChange={this.handleChange}
        value={schoolStore.q.name}
      />
    )
  }
}

export default SearchName
