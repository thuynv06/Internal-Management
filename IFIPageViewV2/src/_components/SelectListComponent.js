import React from 'react';
import PropTypes from 'prop-types';

class SelectListComponent extends React.Component{

  constructor(props){
      super(props);
      this.state={

      };
      this.handleChange = this.handleChange.bind(this);
  }

  // Được gọi khi người dùng click vào option
  handleChange(value){
    this.setState({value})
    console.log(this.refs.sl.value);
  }

  render(){
    return(

      <div className="form-group">
        {/* <label htmlFor="sel1">Select list:</label> */}
        <select ref="sl" className="form-control" id="sel1" onChange={this.props.onChange} style={{width: "10%"}}>
          {this.props.option != null  ? this.props.option.map((option,index)=>{
            return <option key={option} value={option}>{option}</option>
          }) : ""}
        </select>
      </div>

    );
  }
}

SelectListComponent.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  option:PropTypes.array
}

SelectListComponent.defaultProps = {
  name: '',
  option:null
}

export default SelectListComponent;
