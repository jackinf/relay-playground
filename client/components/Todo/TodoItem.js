/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import Relay from 'react-relay';
import RemoveTodoMutation from './../../mutations/RemoveTodoMutation'

import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);



class TodoItemComponent extends React.Component {

  render() {
    const { id, text, complete } = this.props.todo1;

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => this.props.onStartUpdating(this.props.todo1) }>Update</MenuItem>
        <MenuItem onClick={() => this.props.onDeleteClick(this.props.todo1)}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        leftCheckbox={<Checkbox checked={complete} onClick={this.props.onToggleIsComplete} />}
        primaryText={text}
        secondaryText={id}
        rightIconButton={rightIconMenu}
      />
    );
  }
}

export default TodoItemComponent;

// export default Relay.createContainer(TodoItemComponent, {
//   fragments: {
//     todo: () => Relay.QL`
//       fragment on Todo {
//         complete,
//         id,
//         text,
//         ${RemoveTodoMutation.getFragment('todo')}
//       }
//     `,
//     viewer: () => Relay.QL`
//       fragment on User {
//         ${RemoveTodoMutation.getFragment('viewer')}
//       }
//     `
//   }
// });
