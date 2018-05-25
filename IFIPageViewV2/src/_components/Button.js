import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Button extends Component {
  constructor(props){
      super(props);
      this.state = {};
      //  this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if(this.props.onCick){
      this.props.onClick();
      console.log('clicked');
    }
  }
  render() {
    const{type,fontsize,width,height,color,background,borderRadius,children} = this.props;
    return (
      <div>
      <button type={type}
        style={{ fontSize: fontsize, width: width, height:height,color:color,background:background,
                  borderRadius:borderRadius, border:'none'}}>{children}</button>

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
  background:PropTypes.string,
  color:PropTypes.string,
  width:PropTypes.string,
  height:PropTypes.string,
  borderRadius:PropTypes.string,
  fontSize:PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps={
  type:'button',
  background:'#56aaff',
  color:'white',
  width:'',
  height:'',
  borderRadius:'',
  fontSize:''
}
export default Button;
