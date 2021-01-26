import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Components
import { AdormentTextField } from 'components';
import { Button } from '@material-ui/core';
// images
import logo from 'assets/images/logo.svg';
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl';

const OtpForm = ({ dispatch, intl }) => {
    const [otp, setOtp] = useState('');        
    const handleSubmit = useCallback(
        () => {

        }, []
    )
    return (
        <div className="d-flex flex-column flex-row align-items-center justify-content-center h-100">
            <img src={logo} alt="logo" />
            <div className="mt-5 h3">Payouts made easy!</div>
            <div className="width-372">
                <AdormentTextField
                    fullWidth
                    placeholder={intl.formatMessage({ id: "signin.require", defaultMessage: "Require Field" })}
                    adormentText={<p className="m-0"><FormattedMessage
                        id="otp.code"
                        defaultMessage="Otp:"
                    /></p>}
                    className="mt-6"                    
                    value={otp}
                    onChange={(event) => {
                        setOtp(event.target.value);
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
const state = createStructuredSelector({});
export default connect(state)(injectIntl(OtpForm));
