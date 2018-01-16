import React from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Title from './Title'

const drawerWidth = 240

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.primary[700],
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: { width: `calc(100% - ${drawerWidth}px)` },
  },
})

class Header extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Title />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
