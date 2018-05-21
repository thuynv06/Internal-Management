import React from 'react'
import DashboardNotificationComponent from '../_components/DashboardNotificationComponent';
import PropTypes from 'prop-types';
class BlockDashboardNotificationComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="row">
        <div className=" col-md-12 col-xs-12">
          <strong>{this.props.text}</strong>
        </div>

        <DashboardNotificationComponent text="Add New" color="primary"/>

        <DashboardNotificationComponent text="Approving" color="warning"/>

        <DashboardNotificationComponent text="Approved" color="success"/>

        <DashboardNotificationComponent text="UnApprove" color="danger"/>
      </div>
    );
  }
}

BlockDashboardNotificationComponent.propTypes = {
  text:PropTypes.string.isRequired
}


export default BlockDashboardNotificationComponent;
