import React from 'react'
import Layout from './components/Layout'
import StatTable from './components/StatTable'

class App extends React.PureComponent {
  render() {
    return (
      <Layout>
        <StatTable />
      </Layout>
    )
  }
}

export default App
