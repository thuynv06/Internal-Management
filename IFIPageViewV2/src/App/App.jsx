import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import Footer from '../TemplatePage/Footer';
//import { Router, Route  } from 'react-router';
import { history } from '../_helpers/history.js';
import { alertActions } from '../_actions/alert.actions.js';
//import { Router, Route, Link, Prompt,BrowserRouter } from "react-router-dom";

import './css/custom.js';
import Home from '../TemplatePage/Home';
import MyLeave from '../Pages/MyLeave';
import Login from '../Pages/Login';

// Datepicker
import moment from 'moment';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';









class App extends React.Component {


    constructor(props){
        super(props);
        history.push('/');

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });


        
        // Test DatePicker
        this.state = {
            // or Date or Moment.js
            selectedDate: '2017-08-13'
        };
        this.onChange = this.onChange.bind(this);
    }
    
    

    onChange = (date) => {
        // ...
        this.setState({
			selectedDate: date
		});
      }

    //render() {
        // const styleButton = {
        //     height: "40px", color: "orange", width: "10%" ,fontsize: "20px" ,background:"green" ,borderRadius:"10px"
        // };
        // return (
        //         <div className={styles.container_wrap}>
        //             <div className="container ">
        //                 Username
        //                 <InputComponent name="diep" type="text" value="root" placeholder="Username" icon="fa fa-user"/>
        //                 Password
        //                 <InputComponent name="diep" type="password" value="123564" placeholder="Password" icon="fa fa-unlock"/>
        //             </div>
        //             <Button type="submit" {...styleButton}>
        //                 Login
        //             </Button>
        //         </div>

    
    

    render() {
        // const date = '2015-06-26' // or Date or Moment.js
        const styleButton = {
            height: "40px", color: "orange", width: "10%" ,fontsize: "20px" ,background:"green" ,borderRadius:"10px"
        };

        
        
        //return (
                // <div className={styles.container_wrap}>
                //     <div className="container ">
                //         Username
                //         <InputComponent name="diep" type="text" value="root" placeholder="Username" icon="fa fa-user"/>
                //         Password
                //         <InputComponent name="diep" type="password" value="123564" placeholder="Password" icon="fa fa-unlock"/>
                //     </div>
                //     <Button type="submit" {...styleButton}>
                //         Login
                //     </Button>
                // </div>
        // );

        // return(
        //     // this renders the full component (input and datepicker)
        //     <div>
        //         <DatePickerInput
        //             onChange={this.onChange}
        //             value={this.state.selectedDate}
        //             className='my-custom-datepicker-component'
        //         />

        //         {/* this renders only a fixed datepicker */}
        //         <DatePicker onChange={this.onChange} value={this.state.selectedDate} />
        //     </div>
        // )

        const basePath = '/' + window.location.pathname.split('/')[1];
        console.log(basePath);
        return(
            <div>
                <Router history={history}>
                <div>
                        <Route exact path="/home"  component={Home} />
                        <Route exact path="/"  component={Home} />
                        <Route path="/login"  component={Login} />
                        <Route path="/pages/leave" component={MyLeave} />
                </div>
                </Router>
            </div>
            
            
        )  
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
