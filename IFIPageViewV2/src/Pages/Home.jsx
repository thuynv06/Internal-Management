import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import styles from './css/pages.css';
import TableComponent from '../_components/TableComponent/TableComponent';
import users from './data.json';
import convertData from '../_convertData/convertData.js';
export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users: [],
            renderedUsers: [],
            page: 1,
            sizePerPage:10,
            rows:[]
        };
        
        this.handlePageChange = this.handlePageChange.bind(this);
        
    }

    handlePageChange(page,_dataTable) {
        const renderedUsers = this.state.users.slice((page - 1) * this.state.sizePerPage, (page - 1) * this.state.sizePerPage + this.state.sizePerPage);
        // in a real app you could query the specific page from a server user list
        this.setState({ page, renderedUsers });
    }

    componentDidMount() {
        // In a real app we make an http request
        setTimeout(() => {
            this.setState({ users, renderedUsers: users.slice(0, this.state.sizePerPage), total: users.length });
        })
        this.setState({
            users: this.props.tableData
        });
    }

    
    render(){
        const { page, total, renderedUsers } = this.state;
        // // Example Data
        // const tableData = {
        //     columns: ['Service', 'Cost/Unit', 'Unit', 'Units Requested'],
        //     rows: [{
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,
        //     'Unit': '1 Hour',
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,
        //     'Unit': '1 Hour',
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,
        //     'Unit': '1 Hour',
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,
        //     'Unit': '1 Hour',
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,dataRows.map(function(row,index){
        //     'Unit': '1 Hour',dataRows.map(function(row,index){
        //     'Units Requested'dataRows.map(function(row,index){: 12
        //     }, {dataRows.map(function(row,index){
        //     'Service': 'VeterdataRows.map(function(row,index){inary Assitance',
        //     'Cost/Unit': 50,dataRows.map(function(row,index){
        //     'Unit': '1 Hour',dataRows.map(function(row,index){
        //     'Units Requested'dataRows.map(function(row,index){: 12
        //     }, {dataRows.map(function(row,index){
        //     'Service': 'VeterdataRows.map(function(row,index){inary Assitance',
        //     'Cost/Unit': 50,dataRows.map(function(row,index){
        //     'Unit': '1 Hour',dataRows.map(function(row,index){
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,
        //     'Unit': '1 Hour',
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'Veterinary Assitance',
        //     'Cost/Unit': 50,
        //     'Unit': '1 Hour',
        //     'Units Requested': 12
        //     }, {
        //     'Service': 'foo',
        //     'Unit': null,
        //     'Cost/Unit': undefined,
        //     'Units Requested': 42
        //     }]
        // };



        <div className={styles.dashboad}>
                            <BlockDashboard text="Leave"/>
                        </div>
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



                        {/* <ul id="user-list">
                        {
                            renderedUsers.map(user =>
                            <li key={user.id} className="user-list-item">
                                {user.name}
                            </li>)
                        }
                        </ul> */}
                        <TableComponent data = {convertData(users,["Created At","NAME","AVATAR"],[])} isCrud={true} idTable="table1"/>


                    </div>
            </div>
        )
    }
}
