import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import styles from './css/pages.css';
export default class Home extends React.Component{
    render(){
        return(

            <div>
                <NavBar/>
                <Header/>
                    <div className="right_col" role="main">



                      <div className="row">



                          <div className="col-lg-6">
                            <div className={styles.dashboad}>
                              <BlockDashboard text="Leave"/>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className={styles.dashboad}>
                              <BlockDashboard text="Manager"/>
                            </div>
                          </div>

                      </div>

                      <div className="row">



                          <div className="col-lg-6">
                            <div className={styles.dashboad}>
                              <BlockDashboard text="Overtime"/>
                            </div>
                          </div>

                      </div>


                    </div>
            </div>
        )
    }
}
