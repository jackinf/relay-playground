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
  static propTypes = {
    todo: React.PropTypes.object
  };

  static getInitialState = function () {
    console.log('getInitialState');
    return this.props;
  };

  onUpdateClick = () => {
    console.log(this.props.todo.id);
  };

  onDeleteClick = () => {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ todo: this.props.todo, text: this.props.text, viewer: this.props.viewer })
    )
  };

  render() {
    const { id, text, isCompleted } = this.props.todo;

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.onDeleteClick}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        leftCheckbox={<Checkbox checked={isCompleted} onClick={this.props.onToggleIsComplete} />}
        primaryText={text}
        secondaryText={id}
        rightIconButton={rightIconMenu}
      />
    );

    // return (
    //   <div>
    //     <b>{id}</b>
    //     <Checkbox label={text} checked={isCompleted} disabled />
    //     <FABButton name colored ripple onClick={() => this.props.onStartUpdating(this.props.todo) } >
    //       <Icon name='update' />
    //     </FABButton>
    //     <FABButton name colored ripple onClick={this.onDeleteClick} >
    //       <Icon name='delete' />
    //     </FABButton>
    //   </div>
    // );
  }
}

export default Relay.createContainer(TodoItemComponent, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
        text,
        ${RemoveTodoMutation.getFragment('todo')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${RemoveTodoMutation.getFragment('todo')}
      }
    `
  }
});
