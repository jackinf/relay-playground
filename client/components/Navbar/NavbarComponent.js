import React from 'react';
import { browserHistory } from 'react-router';
import styles from './Navbar.scss';

// Material-UI
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class Navbar extends React.Component {
  goTo = (path) => {
    browserHistory.push(path);
  };

  render() {
    const title = 'Relay Fullstack';
    return (
      <AppBar
        title={<span style={styles.title}>{title}</span>}
        iconElementRight={<FlatButton label="Main" onClick={e => this.goTo('/')} />}
        iconElementRight={<FlatButton label="Todos" onClick={e => this.goTo('/todos')} />}
      />
    );
  }
}
