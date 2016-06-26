/**
 * Created by stylehopper on 19.06.16.
 */

import Relay from 'react-relay';

export default class RenameTodoMutaton extends Relay.Mutation {
  // static fragments = {
  //   viewer: () => Relay.QL`
  //     fragment on User {
  //       id
  //     }
  //   `
  // };

  getMutation() {
    return Relay.QL`mutation{renameTodo}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RenameTodoPayload @relay(pattern: true) {
        todo {
          text
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id
      }
    }];
  }

  getVariables() {
    return {
      id: this.props.todo.id,
      text: this.props.text
    };
  }

  getOptimisticResponse() {
    return {
      todo: {
        id: this.props.todo.id,
        text: this.props.text
      }
    };
  }
}
