import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import styles from './css/pages.css';
import InputComponent from '../_components/InputComponent';
import users from './data.json';
import Pagination from '../_components/PaginationComponent';
import TableComponent from '../_components/TableComponent/TableComponent';
import HeaderComponet from '../_components/TableComponent/TableHeaderComponent';
import BodyComponent from '../_components/TableComponent/TableBodyComponent';

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
    render(){
        const { page, total, renderedUsers } = this.state;
        // Example Data
        const tableData = {
            columns: ['Service', 'Cost/Unit', 'Unit', 'Units Requested'],
            rows: [{
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'Veterinary Assitance',
            'Cost/Unit': 50,
            'Unit': '1 Hour',
            'Units Requested': 12
            }, {
            'Service': 'foo',
            'Unit': null,
            'Cost/Unit': undefined,
            'Units Requested': 42
            }]
        };
        return(
            
            <div>
                <NavBar/>
                <Header/>
                    
                    <div className="right_col" role="main">
                        <div className={styles.dashboad}>
                            <BlockDashboard text="Leave"/>
                        </div>


                        {/* <ul id="user-list">
                        {
                            renderedUsers.map(user =>
                            <li key={user.id} className="user-list-item">
                                {user.name}
                            </li>)
                        }
                        </ul> */}
                        <TableComponent data = {tableData} idTable="table1"/>
                        
                        <Pagination
                        margin={2}
                        page={page}
                        count={Math.ceil(total / 8)}
                        onPageChange={this.handlePageChange}
                        />
                    </div>
            </div>
        )
    }
}