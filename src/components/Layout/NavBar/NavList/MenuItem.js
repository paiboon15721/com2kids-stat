import React from 'react'
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import NavigateNextIcon from 'material-ui-icons/NavigateNext'

class MenuItem extends React.Component {
  render() {
    const { primary } = this.props
    return (
      <ListItem button>
        <ListItemIcon>
          <NavigateNextIcon />
        </ListItemIcon>
        <ListItemText inset primary={primary} />
      </ListItem>
    )
  }
}

export default MenuItem
