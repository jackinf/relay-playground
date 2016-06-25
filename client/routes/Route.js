import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import TodoQuery from './../components/Todo/TodoQuery';

import AppContainer from '../components/App/AppContainer';
import FeatureContainer from '../components/Feature/FeatureContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';
import TodoList from '../components/Todo/TodoList';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={FeatureContainer} queries={ViewerQuery} />
    <Route path='/todos' component={TodoList} queries={TodoQuery} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />
    <Redirect from='*' to='/' />
  </Route>
);

