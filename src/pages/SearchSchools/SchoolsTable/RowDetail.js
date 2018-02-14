import React from 'react'

class RowDetail extends React.PureComponent {
  render() {
    const { row } = this.props
    return <div>test {row.assets.computerTotal.usable}</div>
  }
}

export default RowDetail
