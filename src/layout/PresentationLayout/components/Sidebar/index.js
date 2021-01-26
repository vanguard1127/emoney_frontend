import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withMemo } from 'components/HOC';
import SidebarItem from './SidebarItem';
import List from '@material-ui/core/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () =>
{
    return(
        <div className="sidebar">            
            <List>
                <SidebarItem icon={<FontAwesomeIcon icon={faChartLine} />}/>
                <SidebarItem icon={<span className="emicon-company"/>}/>
                <SidebarItem icon={<span className="emicon-payees"/>}/>
            </List>
        </div>
    );
}

const state = createStructuredSelector({});
export default connect(state)(withMemo(Sidebar));
