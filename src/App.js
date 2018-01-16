import React from 'react'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Layout from './components/Layout'
import Main from './pages/Main'
import StatBySchool from './pages/StatBySchool'
import UiStore from './stores/UiStore'
import StatStore from './stores/StatStore'

class App extends React.PureComponent {
  render() {
    return (
      <Provider uiStore={UiStore} statStore={StatStore}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={() => <Redirect to="/main" />} />
              <Route path="/main" component={Main} />
              <Route path="/stat-by-school" component={StatBySchool} />
            </Switch>
            {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
