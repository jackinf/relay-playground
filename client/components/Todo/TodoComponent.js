/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import TodoItem from './TodoItem';
import { FABButton, Icon, Grid, Cell, Textfield } from 'react-mdl';

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
  static propTypes = {
    viewer: React.PropTypes.object
  };

  render() {
    const todosBlock = getTodosBlock(this.props.viewer);
    return (
      <div>
        <h2>Todo Main container component</h2>

        <Grid>
          <Cell col={2}>
            <Textfield
              onChange={() => {}}
              label='Text...'
              style={{ width: '200px' }}
            />
          </Cell>
          <Cell col={1}>
            <FABButton colored ripple>
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
