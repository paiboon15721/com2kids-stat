import React from 'react'
import { withStyles } from 'material-ui/styles'
import { inject } from 'mobx-react'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

@inject('uiStore')
class MenuButton extends React.Component {
  render() {
    const { uiStore, classes } = this.props
    return (
      <IconButton
        color="inherit"
        onClick={uiStore.openMobileNav}
        className={classes.navIconHide}
      >
        <MenuIcon />
      </IconButton>
    )
  }
}

export default withStyles(styles)(MenuButton)
