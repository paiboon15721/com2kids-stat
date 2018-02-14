import React from 'react'
import Button from 'material-ui/Button'

class SearchButton extends React.PureComponent {
  render() {
    return (
      <Button
        variant="raised"
        type="submit"
        color="primary"
        className={this.props.className}
      >
        Search
      </Button>
    )
  }
}

export default SearchButton
