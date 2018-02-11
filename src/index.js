import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import statStore from './stores/StatStore'
import 'typeface-roboto'
import 'react-select/dist/react-select.css'
import './index.css'
import fire from './helpers/fire'
import registerServiceWorker from './registerServiceWorker'

fire
  .database()
  .ref('/')
  .on('value', s => {
    statStore.setStat(s.val())
  })

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(<NextApp />, root)
  })
}
registerServiceWorker()
