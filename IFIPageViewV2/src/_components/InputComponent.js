import React from 'react';
import PropTypes from 'prop-types';

export default class InputComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          value: props.defaultValue,
        };
        this.onChange = this.onChange.bind(this);
      }
    
      componentDidMount() {
        
      }
    
      onChange(e) {
        const value = e.target.value;
        this.setState({ value });
    
        console.log(value);
      }
    
      render() {
        return (
          <div>
            <input
              name={this.props.name}
              type={this.props.type}
              value={this.state.value}
              onChange={this.onChange}
              placeholder={this.props.placeholder}
            />
          </div>
        );
      }
}

InputComponent.propTypes = {

    type: PropTypes.oneOf([
      'text',
      'password',
      'email',
      'number'
    ]),
  
    name: PropTypes.string.isRequired,
  
    defaultValue: PropTypes.string,
  
    placeholder: PropTypes.string,

    onChange: PropTypes.func,
  
    style: PropTypes.shape({
      container: PropTypes.object,
      input: PropTypes.object
    }),
  
  };
  
  InputComponent.defaultProps = {
    type: 'text',
    name: '',
    defaultValue: '',
    placeholder: '',
    style: null,
  };
  
  