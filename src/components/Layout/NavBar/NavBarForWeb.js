import React from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import NavBarChild from './NavBarChild'

const styles = theme => ({
  drawerPaper: {
    width: 240,
  },
})

class NavBarForWeb extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Drawer type="permanent" classes={{ paper: classes.drawerPaper }}>
        <NavBarChild />
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavBarForWeb)
