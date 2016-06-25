/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import Relay from 'react-relay';
import TodoItem from './TodoItem';
import { FABButton, Icon, Grid, Cell, Textfield } from 'react-mdl';
import AddTodoMutation from './../../mutations/AddTodoMutation';

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

  renderTodos = () => {
    return this.props.viewer.todos.edges.map((edge) => {
      console.log(edge.node);
      return (
        <Cell col={12} key={edge.node.id}>
          <TodoItem
            key={edge.node.id}
            todo={edge.node}
            viewer={this.props.viewer}
          />
        </Cell>);
      }
    );
  };

  render() {
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

        <Grid>
          {this.renderTodos()}
        </Grid>
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
                ${AddTodoMutation.getFragment('viewer')}
            }
        `
    }
});

