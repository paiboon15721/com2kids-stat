import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import Header from './Header'
import { NavBarForWeb, NavBarForMobile } from './NavBar'

const styles = theme => ({
  appFrame: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: 240,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
})

@withStyles(styles)
@withRouter
class Layout extends React.PureComponent {
  render() {
    const { classes, children } = this.props

    return (
      <div className={classes.appFrame}>
        <Header />
        <Hidden mdUp key="1">
          <NavBarForMobile />
        </Hidden>
        <Hidden smDown implementation="css" key="2">
          <NavBarForWeb />
        </Hidden>
        <main className={classes.content}>{children}</main>
      </div>
    )
  }
}

export default Layout
