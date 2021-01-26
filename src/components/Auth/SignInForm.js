import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Components
import { AdormentTextField } from 'components';
import { Button } from '@material-ui/core';
// images
import logo from 'assets/images/logo.svg';
import { useHistory } from 'react-router-dom';
import * as UserActions from 'redux/actions/UserActions';
import { VALIDATORS } from 'constant/validator';
import { withMemo } from 'components/HOC';
import {FormattedMessage} from 'react-intl'
import {injectIntl} from 'react-intl'; 

const SignInForm = ({ dispatch , intl}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const history = useHistory();

    const handleSubmit = useCallback(
        async (event) => {
            console.log();
            event.preventDefault();
            try {
                await dispatch(
                    UserActions.login({
                        username: username,
                        password: password
                    })
                );
                history.push('/user/otp');
            } catch {
                setError({
                    username: VALIDATORS.loginFail.errorMessage,
                    password: VALIDATORS.loginFail.errorMessage
                });
            }
        },
        [dispatch, username, password, history]
    );
    return (
        <div className="d-flex flex-column flex-row align-items-center justify-content-center h-100">
            <img src={logo} alt="logo" />
            <div className="mt-5 h3">
                <FormattedMessage
                        id="signin.payment.title"
                        defaultMessage="Payouts made easy!"                        
                        />
            </div>
            <div className="width-372">
                <AdormentTextField
                    fullWidth
                    placeholder={intl.formatMessage({id: "signin.require", defaultMessage: "Require Field"})}
                    adormentText={<p className="m-0"><FormattedMessage
                        id="signin.user"
                        defaultMessage="User:"                                        
                      /></p>}
                    className="mt-6"
                    error={!!error['username']}
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <AdormentTextField
                    fullWidth
                    placeholder={intl.formatMessage({id: "signin.require", defaultMessage: "Require Field"})}
                    adormentText={<p className="m-0"><FormattedMessage
                        id="signin.password"
                        defaultMessage="Password:"                                        
                      /></p>}
                    type="password"
                    className="mt-3"
                    value={password}
                    error={!!error['password']}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    className="mt-4 width-372 bg-color-228fee text-white"
                    onClick={handleSubmit}>
                    <p className="m-0"><FormattedMessage
                        id="signin.btn.login"
                        defaultMessage="Login"                                        
                      /></p>
                </Button>
            </div>
        </div>
    );
};
const state = createStructuredSelector({
    
});
export default connect(state)(withMemo(injectIntl(SignInForm)));
