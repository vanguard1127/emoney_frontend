import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect } from 'react-router';
import { getUser } from 'redux/selectors';
import { withMemo } from 'components/HOC';  

const NotAuthRoute = ({ component: Component, user, ...rest }) => {    
    return (
        <Route
            {...rest}
            render={(props) =>
                user?.isAuthorized === false ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: '/', state: { from: props.location } }}
                    />
                )
            }
        />
    );
};

const state = createStructuredSelector({
    user: getUser
});

export default connect(state)(withMemo(NotAuthRoute));
