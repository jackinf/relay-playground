/**
 * Created by stylehopper on 19.06.16.
 */

import Relay from 'react-relay';

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  static fragments = {
    // todo: () => Relay.QL`
    //   fragment on Todo {
    //     id
    //   }
    // `,
    viewer: () => Relay.QL`
      fragment on User {
        id
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
      complete: this.props.complete,
      id: this.props.todo.id
    };
  }

  getOptimisticResponse() {
    return {
      todo: {
        complete: this.props.complete,
        id: this.props.todo.id
      },
      viewer: {
        id: this.props.viewer.id
      }
    };
  }
}
