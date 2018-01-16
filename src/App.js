import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './pages/Main'

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App
