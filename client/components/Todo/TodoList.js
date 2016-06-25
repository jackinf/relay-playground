/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import Relay from 'react-relay';
import TodoItem from './TodoItem';
import { FABButton, Icon, Grid, Cell, Textfield } from 'react-mdl';
import AddTodoMutation from './../../mutations/AddTodoMutation'; import RenameTodoMutation from "../../mutations/RenameTodoMutation";

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
    console.log(todo);
    this.setState({ isUpdating: true, todoText: todo.text, updatedTodo: todo });
  };

  onConfirmUpdate = () => {
    this.setState({ isUpdating: false, todoText: '', updatedTodo: {} });
    this.props.relay.commitUpdate(
      new RenameTodoMutation({ todo: this.state.updatedTodo, text: this.state.todoText })
    )
  };

  renderTodos = () => {
    return this.props.viewer.todos.edges.map((edge) => {
      return (
        <Cell col={12} key={edge.node.id}>
          <TodoItem
            key={edge.node.id}
            todo={edge.node}
            viewer={this.props.viewer}
            onStartUpdating={this.onStartUpdating}
          />
        </Cell>);
      }
    );
  };

  render() {
    var addButton = (
      <FABButton colored ripple onClick={this.addTodoClicked}>
        <Icon name='add' />
      </FABButton>
    );
    var updateButton = (
      <FABButton colored ripple onClick={this.onConfirmUpdate}>
        <Icon name='update' />
      </FABButton>
    );
    var button = this.state.isUpdating ? updateButton : addButton;

    return (
      <div>
        <h2>{ this.state.isUpdating ? 'Updating existing task' : 'Add new todo task'}</h2>

        <Grid>
          <Cell col={2}>
            <Textfield
              onChange={ this.onTextChanged }
              label={ this.state.todoLabel }
              value={ this.state.todoText }
              style={{ width: '200px' }}
            />
          </Cell>
          <Cell col={1}>
            {button}
          </Cell>
        </Grid>

        <Grid>
          {this.renderTodos()}
        </Grid>
      </div>
    );
  }
}

export default Relay.createContainer(TodoComponent, {
    fragments: {
        todo: () => Relay.QL`
          fragment on Todo {
              id,
              complete,
              text,
              ${RenameTodoMutation.getFragment('todo')}
          }  
        `,
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
            }
        `
    }
});

