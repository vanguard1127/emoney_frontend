import React from 'react';

import PropTypes from 'prop-types';

import { Container} from '@material-ui/core';

import { connect } from 'react-redux';

import { Header, Sidebar } from './components';

const PresentationLayout = props => {
  const { children } = props;

  return (
    <>
      <div className="app-wrapper vh-100 overflow-hidden flex-column">
        <Header title={props.headerTitle} />
        <div className="flex-grow-1 app-content p-0 w-100 app-container d-flex flex-row">
          <Sidebar menu={props.sidebarMenu || ''} />
          <Container maxWidth="xl" className="page-container">
            {children}
          </Container>
        </div>
      </div>
    </>
  );
};

PresentationLayout.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(PresentationLayout);
