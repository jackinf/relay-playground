/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import TodoItem from './TodoItem';
import { FABButton, Icon, Grid, Cell, Textfield } from 'react-mdl';
import AddTodoMutation from "../../mutations/AddTodoMutation";

function getTodosBlock(viewer) {
  return viewer.todos.edges.map((edge) => (
    <Cell col={12} key={edge.node.id}>
      <TodoItem
        todo={edge.node}
        viewer={viewer}
      />
    </Cell>)
  );
}

/**
 * TodoList
 */
class TodoComponent extends React.Component {
  constructor() {
    super();
    this.state = { todoText: '', todoLabel: 'Add new todo here...' };

    this.addTodoClicked = this.addTodoClicked.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  static propTypes = {
    viewer: React.PropTypes.object
  };

  addTodoClicked() {
    if (this.state.todoText.length > 0) {
      this.props.relay.commitUpdate(
        new AddTodoMutation({ text: this.state.todoText, viewer: this.props.viewer })
      );
      this.setState({ todoText: '' });
    }
  }

  onTextChanged(e) {
    this.setState({ todoText: e.target.value });
  }

  render() {
    const todosBlock = getTodosBlock(this.props.viewer);
    return (
      <div>
        <h2>Todo Main container component</h2>

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
            <FABButton colored ripple onClick={this.addTodoClicked}>
              <Icon name='add' />
            </FABButton>
          </Cell>
        </Grid>

        <Grid>{todosBlock}</Grid>
      </div>
    );
  }
}

export default TodoComponent;
