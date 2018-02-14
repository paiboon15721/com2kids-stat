import React from 'react'
import map from 'lodash/map'
import flat from 'flat'

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '25%',
    marginBottom: '0.5rem',
  },
  key: {
    display: 'inline-block',
  },
}

const Item = ({ k, v }) => (
  <div style={styles.item}>
    <b style={styles.key}>{k}:</b> <font color="red">{v}</font>
  </div>
)

class RowDetail extends React.PureComponent {
  renderItemsList() {
    return map(flat(this.props.row), (v, k) => {
      return <Item key={k} k={k} v={v} />
    })
  }

  render() {
    return <div style={styles.root}>{this.renderItemsList()}</div>
  }
}

export default RowDetail
