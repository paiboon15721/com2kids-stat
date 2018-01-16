import React from 'react'
import Typography from 'material-ui/Typography'

class Title extends React.Component {
  render() {
    return (
      <Typography
        type="title"
        color="inherit"
        style={{ flexGrow: 1, marginLeft: 10 }}
        noWrap
      >
        Title
      </Typography>
    )
  }
}

export default Title
