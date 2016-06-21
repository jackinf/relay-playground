/**
 * Created by stylehopper on 19.06.16.
 */

import Relay from 'react-relay';

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id
      }  
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        todos
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation{changeTodoStatus}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ChangeStatusPayload @relay(pattern: true) {
        todo {
          complete
        }
        viewer {
          todos
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        viewer: this.props.viewer.id
      }
    }];
  }

  getVariables() {
    return {
      id: this.props.id,
      complete: this.props.complete
    };
  }

  getOptimisticResponse() {
    return {
      todo: {
        id: this.props.todo.id,
        complete: this.props.todo.complete
      },
      viewer: {
        id: this.props.viewer.id
      }
    };
  }
}
