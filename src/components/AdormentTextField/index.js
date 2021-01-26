import React from 'react';
import { withMemo } from 'components/HOC';
import { TextField, InputAdornment } from '@material-ui/core';

const AdormentTextField = ({ adormentText, ...props }) => {
    return (
        <TextField
            {...props}
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        classes={{
                            positionStart: 'andorment-start'
                        }}
                        position="start">
                        {adormentText}
                    </InputAdornment>
                )
            }}
        />
    );
};

export default withMemo(AdormentTextField);
