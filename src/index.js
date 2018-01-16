import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'typeface-roboto'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(<NextApp />, root)
  })
}
registerServiceWorker()
