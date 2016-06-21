/**
 * Created by stylehopper on 19.06.16.
 */

import React from 'react';
import { Checkbox } from 'react-mdl';

class TodoItem extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object
  };

  render() {
    const { id, text, isCompleted } = this.props.todo;

    return (
      <div>
        <b>{id}</b>
        <Checkbox label={text} checked={isCompleted} disabled />
      </div>
    );
  }
}

export default TodoItem;
