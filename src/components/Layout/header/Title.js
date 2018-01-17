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
        COM2KIDS Dashboard{' '}
        <a
          href="https://com2kids-5be26.firebaseio.com/.json"
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: 'red' }}
        >
          [raw data]
        </a>
      </Typography>
    )
  }
}

export default Title
