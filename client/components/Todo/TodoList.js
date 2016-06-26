/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import Relay from 'react-relay';
import TodoItem from './TodoItem';

// Material-UI
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentUpdate from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';

// Mutations
import AddTodoMutation from './../../mutations/AddTodoMutation';
import RenameTodoMutation from "./../../mutations/RenameTodoMutation";
import RemoveTodoMutation from './../../mutations/RemoveTodoMutation';
import ChangeTodoStatusMutation from "../../mutations/ChangeTodoStatusMutation";

/**
 * TodoList
 */
class TodoComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      todoText: '',
      todoLabel: 'Add new todo here...',
      isUpdating: false,
      updatedTodo: {}
    };
  }

  static propTypes = {
    viewer: React.PropTypes.object
  };

  addTodoClicked = () => {
    if (this.state.todoText.length > 0) {
      this.props.relay.commitUpdate(
        new AddTodoMutation({ text: this.state.todoText, viewer: this.props.viewer })
      );
      this.setState({ todoText: '' });
    }
  };

  onTextChanged = (e) => {
    this.setState({ todoText: e.target.value });
  };

  onStartUpdating = (todo) => {
    this.setState({ isUpdating: true, todoText: todo.text, updatedTodo: todo });
  };

  onConfirmUpdate = () => {
    this.setState({ isUpdating: false, todoText: '', updatedTodo: {} });
    this.props.relay.commitUpdate(
      new RenameTodoMutation({ todo: this.state.updatedTodo, text: this.state.todoText })
    )
  };

  onToggleIsComplete = (e, node) => {
    this.props.relay.commitUpdate(
      new ChangeTodoStatusMutation({ complete: !node.complete, todo: node, viewer: this.props.viewer })
    );
  };

  onDeleteClick = (todo) => {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ todo, text: todo.text, viewer: this.props.viewer })
    )
  };

  render() {

    var todosBlock = this.props.viewer.todos.edges.map((edge) => {
      return (
        <TodoItem
          key={edge.node.id}
          todo1={edge.node}
          onStartUpdating={this.onStartUpdating}
          onDeleteClick={this.onDeleteClick}
          onToggleIsComplete={e => this.onToggleIsComplete(e, edge.node)}
        />
      );
    });

    var addButton = (
      <FloatingActionButton onClick={this.addTodoClicked}>
        <ContentAdd />
      </FloatingActionButton>
    );
    var updateButton = (
      <FloatingActionButton onClick={this.onConfirmUpdate}>
        <ContentUpdate />
      </FloatingActionButton>
    );
    var button = this.state.isUpdating ? updateButton : addButton;

    return (
      <div>
        <h2>{ this.state.isUpdating ? 'Updating existing task' : 'Add new todo task'}</h2>

        <TextField
          onChange={ this.onTextChanged }
          hintText={ this.state.todoLabel }
          value={ this.state.todoText }
          style={{ width: '200px' }}
        />
        {button}

        <div>
          <List style={{ width: '500px', border: '1px solid #eee', background: '#efefef' }}>
            <Subheader>Todos</Subheader>
            {todosBlock}
          </List>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(TodoComponent, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on User {
                todos(first: 10) {
                    edges {
                        node {
                            id,
                            text,
                            complete
                        }
                    }
                },
                ${AddTodoMutation.getFragment('viewer')},
                ${ChangeTodoStatusMutation.getFragment('viewer')},
                ${RemoveTodoMutation.getFragment('viewer')}
            }
        `
    }
});

