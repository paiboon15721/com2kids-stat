import React from 'react'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { withRouter } from 'react-router-dom'
import map from 'lodash/map'
import MenuItem from './MenuItem'

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
  },
})

@withRouter
class NavList extends React.PureComponent {
  render() {
    const { classes, items } = this.props
    return (
      <List className={classes.root}>
        {map(items, x => (
          <div key={x.primary}>
            <MenuItem {...x} />
            <Divider light />
          </div>
        ))}
      </List>
    )
  }
}

export default withStyles(styles)(NavList)
