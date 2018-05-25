import React, { Component } from 'react';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import styles from './css/pages.css';
import InputComponent from '../_components/InputComponent';
import users from '../fakedata/mock.json';
import Pagination from '../_components/PaginationComponent';
import TableComponent from '../_components/TableComponent/TableComponent';
import HeaderComponet from '../_components/TableComponent/TableHeaderComponent';
import BodyComponent from '../_components/TableComponent/TableBodyComponent';
import SelectListComponent from '../_components/SelectListComponent';

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
        this.changePerPage = this.changePerPage.bind(this);
    }

    handlePageChange(page,_dataTable) {
        const renderedUsers = this.state.users.slice((page - 1) * this.state.sizePerPage, (page - 1) * this.state.sizePerPage + this.state.sizePerPage);
        // in a real app you could query the specific page from a server user list
        this.setState({ page, renderedUsers });
    }

    editTable(){
        console.log("edit hehe");
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
    changePerPage(e){
        this.setState({
            sizePerPage : Number(e.target.value)
        });
        console.log(Number(e.target.value));
    }

    render(){
        const { page, total, renderedUsers} = this.state;
        // Example Data
        const tableData = {
            headerCol: ["Project","From Date", "To Date", "Status","Type","Description","User Approved","User Next Approved"],
            columns: Object.keys(users[0]),
            rows: []
        };

        const selectData = [10,20,30];
        
        for(var i = 0 ; i<users.length ; i++)
            tableData.rows.push(users[i]);
            

        return(
            
            <div>
                <NavBar/>
                <Header/>
                    
                    <div className="right_col" role="main">
                        <div className={styles.dashboad}>
                            {/* <BlockDashboard text="Leave"/>
                            <BlockDashboard text="Overtime"/> */}
                        </div>


                        {/* <ul id="user-list">
                        {
                            renderedUsers.map(user =>
                            <li key={user.id} className="user-list-item">
                                {user.name}
                            </li>)
                        }
                        </ul> */}
                        <TableComponent data = {tableData} idTable="table1" isCrud={true}/>

                        <div>
                            <Pagination
                            margin={2}
                            page={page}
                            count={Math.ceil(total / this.state.sizePerPage)}
                            onChange={this.handlePageChange}
                            />
                            <SelectListComponent option={selectData} onChange={this.changePerPage}/>
                        </div>
                    </div>
            </div>
        )
    }
}