import React from 'react'
import Button from 'material-ui/Button'
import fire from './helpers/fire'

class App extends React.PureComponent {
  componentDidMount() {
    fire
      .database()
      .ref('/')
      .on('value', s => {
        console.log(s.val())
      })
  }

  render() {
    return (
      <Button raised color="primary">
        Hello World
      </Button>
    )
  }
}

export default App
