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
      <div className="row block">
        <div className=" col-md-12 col-xs-12">
          <strong style={{fontSize:'40px',color:'red'}}>{this.props.text}</strong>
        </div>

        <DashboardNotificationComponent text="New" color="primary"/>

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
