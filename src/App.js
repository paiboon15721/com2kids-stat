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
import TotalStat from './pages/TotalStat'
import StatByDate from './pages/StatByDate'
import SearchSchools from './pages/SearchSchools'
import UiStore from './stores/UiStore'
import StatStore from './stores/StatStore'
import SchoolStore from './stores/SchoolStore'

class App extends React.PureComponent {
  render() {
    return (
      <Provider
        uiStore={UiStore}
        statStore={StatStore}
        schoolStore={SchoolStore}
      >
        <Router>
          <Layout>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/total-stat" />}
              />
              <Route path="/total-stat" component={TotalStat} />
              <Route path="/stat-by-date/:back?" component={StatByDate} />
              <Route path="/search-schools" component={SearchSchools} />
            </Switch>
            {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
