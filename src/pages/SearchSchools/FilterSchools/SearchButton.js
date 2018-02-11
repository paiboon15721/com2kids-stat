import React from 'react'
import Button from 'material-ui/Button'
import { inject } from 'mobx-react'

@inject('schoolStore')
class SearchButton extends React.PureComponent {
  fetchSchools = () => this.props.schoolStore.fetchSchools(1)

  render() {
    return (
      <Button variant="raised" color="primary" onClick={this.fetchSchools}>
        Search
      </Button>
    )
  }
}

export default SearchButton
