import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Button extends Component {
  constructor(props){
      super(props);
      this.state = {};
      this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if(this.props.onCick){
      this.props.onClick();
    }
  }
  render() {
    const{type,btn,children} = this.props;
    return (
      <div>
      <button className={"btn btn-"+this.props.btn} type={type} onClick={this.onClick}
        >{this.props.children}</button>

      </div>
    );
  }
}
Button.propTypes = {
  type: PropTypes.oneOf([
    'submit',
    'reset',
    'button'
  ]).isRequired,
  btn:PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'default',
    'link',
    'btn'
  ]),
  onClick: PropTypes.func,
}

Button.defaultProps={
  type:''

}
export default Button;
