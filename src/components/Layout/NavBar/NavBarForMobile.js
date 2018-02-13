import React from 'react'
import { observer, inject } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import NavBarChild from './NavBarChild'

const styles = theme => ({
  drawerPaper: {
    width: 250,
  },
})

@inject('uiStore')
@observer
class NavBarForMobile extends React.Component {
  render() {
    const { classes, uiStore } = this.props
    const { showMobileNav, closeMobileNav } = uiStore

    return (
      <Drawer
        variant="temporary"
        open={showMobileNav}
        onClose={closeMobileNav}
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
