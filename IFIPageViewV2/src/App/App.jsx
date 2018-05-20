import React from 'react';
import { connect } from 'react-redux';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import Footer from '../TemplatePage/Footer';
//import { Router, Route  } from 'react-router';
import { history } from '../_helpers/history.js';
import { Router, Route, Link, Prompt } from "react-router-dom";

import './css/custom.js';
import Home from '../TemplatePage/Home';
import MyLeave from '../Pages/MyLeave';
import Login from '../Pages/Login';






class App extends React.Component {

    constructor(props){
        super(props);
        history.push('/home');
    }
    

    render() {
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
                
        // );

        const basePath = '/' + window.location.pathname.split('/')[1];
        console.log(basePath);
        return(

            
            

            <div>
                <NavBar/>
                <Header/>
                <Router history={history}>
                    <div>
                        <Route path="/home" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/pages/leave" render={() => console.log("Leave Page")} />
                    </div>
                </Router>
                <Footer/>
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
