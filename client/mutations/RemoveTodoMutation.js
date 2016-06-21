/**
 * Created by stylehopper on 19.06.16.
 */

import Relay from 'react-relay';

export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo  {
        id,
        complete
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation{removeTodo}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoPayload @relay(pattern: true) {
        deletedTodoId,
        viewer {
          id,
          todos
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoId',
    }];
  }

  getVariables() {
    return { id: this.props.todo.id };
  }

  getOptimisticResponse() {
    return {
      deletedTodoId: this.props.todo.id,
      viewer: this.props.viewer.id
    };
  }
}
