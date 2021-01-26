import React from 'react';
import {withRouter} from 'react-router-dom';

class PageHeadline extends React.Component {
  render() {
    return (
      <div className="page-headline">
        <div className="headline-title">{this.props.title}</div>
        <div className="headline-toolbar">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(PageHeadline);
