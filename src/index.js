import React from 'react'
import ReactDOM from 'react-dom'
import Button from 'material-ui/Button'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const App = () => (
  <Button raised color="primary">
    Hello World
  </Button>
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
