import React from 'react';
import { withMemo } from 'components/HOC';
import { MenuItem} from '@material-ui/core';

const DropdownMenuItem = ({text, icon,...props }) => {
    return (
        <MenuItem {...props}>
            <span className={icon}/>
            <span className="ml-2">
                {text}
            </span>
        </MenuItem>
    );
};

export default withMemo(DropdownMenuItem);
