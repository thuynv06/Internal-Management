import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import styles from './css/pages.css';
import TableComponent from '../_components/TableComponent/TableComponent';
import users from './data.json';
export default class Home extends React.Component{

    constructor(props){
        super(props);
        super(props);
        this.state = {
            users: [],
            renderedUsers: [],
            page: 1,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page) {
        const renderedUsers = this.state.users.slice((page - 1) * 8, (page - 1) * 8 + 8);
        // in a real app you could query the specific page from a server user list
        this.setState({ page, renderedUsers });
    }

    componentDidMount() {
        // In a real app we make an http request
        setTimeout(() => {
            this.setState({ users, renderedUsers: users.slice(0, 8), total: users.length });
        })
    }

    // // Lấy ra tiêu đề các cột
    //  getHeader(json) {
    //     var columns = [];
    //     if(json!==null){
    //       for(var header in json[0]){
    //         columns.push(header);
    //       }
    //       return columns;
    //     }
    //   }
    
    // // Lấy ra tiêu đề các cột
    //  filterCol(json,...arrIndex) {
    //     var columns = [];
        
    //   }
    
    // Convert về dạng đích
       convertData(json, ArrayHeader, ArrayColumn) {
        const tableData = {
          headerCol : [...ArrayHeader],
          columns:Object.keys(json[0]).filter(function (item){return !ArrayColumn.includes(item)}),
          rows:Object.values(json)
        }
        console.log(tableData.columns);
        console.log(tableData.rows)
        return tableData;


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
                        <TableComponent data = {this.convertData(users,["CREATE AT","NAME","AVATAR"],['id'])} idTable="table1"/>


                    </div>
            </div>
        )
    }
}
