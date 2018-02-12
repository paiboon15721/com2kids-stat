import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import NavList from './NavList'
import menuData from './menuData'

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.mixins.toolbar,
  },
  title: {
    color: 'red',
  },
})

class NavBarChild extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.drawerHeader}>
          <Typography type="title" className={classes.title}>
            v.1.0.1
          </Typography>
        </div>
        <Divider />
        <NavList items={menuData} />
      </div>
    )
  }
}

export default withStyles(styles)(NavBarChild)
