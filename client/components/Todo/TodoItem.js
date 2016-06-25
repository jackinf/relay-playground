/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import Relay from 'react-relay';
import { Checkbox, FABButton, Icon } from 'react-mdl';
import RemoveTodoMutation from './../../mutations/RemoveTodoMutation'

class TodoItemComponent extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object
  };

  onUpdateClick = () => {
    console.log(this.props.todo.id);
  };

  onDeleteClick = () => {
    console.log(this.props.todo.id);
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ todo: this.props.todo, text: this.props.text, viewer: this.props.viewer })
    )
  };

  render() {
    const { id, text, isCompleted } = this.props.todo;

    return (
      <div>
        <b>{id}</b>
        <Checkbox label={text} checked={isCompleted} disabled />
        <FABButton name colored ripple onClick={this.onUpdateClick} >
          <Icon name='update' />
        </FABButton>
        <FABButton name colored ripple onClick={this.onDeleteClick} >
          <Icon name='delete' />
        </FABButton>
      </div>
    );
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
