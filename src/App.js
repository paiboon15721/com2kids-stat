import React from 'react'
import Layout from './components/Layout'
import Main from './pages/Main'

class App extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Main />
      </Layout>
    )
  }
}

export default App
