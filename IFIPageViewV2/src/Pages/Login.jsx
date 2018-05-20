import React, { Component } from 'react';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';

export default class Home extends React.Component{
    render(){
        const styleButton = {
            height: "40px", color: "orange", width: "30%" ,fontsize: "20px" ,background:"darkgreen" ,borderRadius:"10px"
        };
        return(
            
            <div className="login_page">
                <img src="assets/images/logo-ifi.png"/>
                <div className="bottom_block" style={{backgroundImage: `url('assets/images/sky-183869__340.jpg')`}}>
                    <div><i className="fa fa-user logo_user" style={{lineHeight:0.8}}></i></div>
                    <h3 className="login_text">Sign In</h3>
                    <InputComponent name="username" type="text" value="root" placeholder="Username" icon="fa fa-user"/><br/><br/>
                    <InputComponent name="password" type="password" value="123564" placeholder="Password" icon="fa fa-lock"/>
                    <div className="button_block">
                        <Button type="submit" {...styleButton}>
                            Login
                        </Button>
                     </div>
                </div>
            </div>
        )
    }
}