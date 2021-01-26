import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withMemo } from 'components/HOC';
//import { NavLink } from "react-router-dom";
const SidebarItem = ({key, icon, selected, ...props}) =>
{
    return(
        <Link to="">
            <ListItem button key="">
                <ListItemIcon>
                    {icon}
                </ListItemIcon>            
            </ListItem>        
        </Link>
    )
}
const state = createStructuredSelector({});
export default connect(state)(withMemo(SidebarItem));

