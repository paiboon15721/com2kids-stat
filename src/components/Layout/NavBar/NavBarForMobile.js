import React from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import NavBarChild from './NavBarChild'

const styles = theme => ({
  drawerPaper: {
    width: 250,
  },
})

class NavBarForMobile extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Drawer
        type="temporary"
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <NavBarChild />
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavBarForMobile)
