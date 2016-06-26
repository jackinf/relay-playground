import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

import '../node_modules/react-mdl/extra/material.js';
import Route from './routes/Route';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

export default class AppWrapper extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory} routes={Route} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />
      </MuiThemeProvider>
    );
  }
}


ReactDOM.render(
  <AppWrapper />,
  rootNode
);
