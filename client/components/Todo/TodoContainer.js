/**
 * Created by stylehopper on 19.06.16.
 */

import Relay from 'react-relay';
import TodoComponent from './TodoComponent';

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
        }
      }
    `
  }
});