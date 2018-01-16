import React from 'react'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './pages/Main'
import UiStore from './stores/UiStore'
import StatStore from './stores/StatStore'

class App extends React.PureComponent {
  render() {
    return (
      <Provider uiStore={UiStore} statStore={StatStore}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
            {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
