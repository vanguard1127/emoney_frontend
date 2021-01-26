import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect } from 'react-router';
import { getUser } from 'redux/selectors';

const AuthRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.isAuthorized === false /* true */? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/PagesLogin', state: { from: props.location } }}
        />
      )
    }
  />
);

const state = createStructuredSelector({
  user: getUser
});

export default connect(state)(AuthRoute);
