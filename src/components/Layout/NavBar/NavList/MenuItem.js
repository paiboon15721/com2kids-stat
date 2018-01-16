import React from 'react'
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import NavigateNextIcon from 'material-ui-icons/NavigateNext'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@withRouter
@inject('uiStore')
@observer
class MenuItem extends React.Component {
  render() {
    const { primary, path, history, uiStore } = this.props
    const active = path === history.location.pathname
    return (
      <ListItem
        button
        onClick={() => {
          history.push(path)
          uiStore.changePath(path)
        }}
      >
        {active && (
          <ListItemIcon>
            <NavigateNextIcon />
          </ListItemIcon>
        )}
        <ListItemText inset primary={primary} />
      </ListItem>
    )
  }
}

export default MenuItem
