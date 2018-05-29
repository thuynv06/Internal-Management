import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { leaveActions } from '../_actions/leave.actions.js';

export default class Home extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            users: [],
            renderedUsers: [],
            loading: true,
            pages:0,
            page: 1,
            sizePerPage:10,
            status:0,
            rows:[],
        };
        
        this.handlePageChange = this.handlePageChange.bind(this);
        this.changePerPage = this.changePerPage.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        // In a real app we make an http request
        setTimeout(() => {
            this.setState({ users, renderedUsers: users.slice(0, this.state.sizePerPage), total: users.length });
        })
        this.setState({
            users: this.props.tableData
        });
    }

    fetchData(page, pageSize, status){
        if(status == undefined) status = this.state.status;
        if(page == undefined) page = this.state.page;
        if(pageSize == undefined) pageSize = this.state.sizePerPage;

        this.props.dispatch(leaveActions.getLeaveByPage(page,pageSize,this.state.sorted,0));

    }

    handlePageChange(page) {
        const renderedUsers = this.state.users.slice((page - 1) * this.state.sizePerPage, (page - 1) * this.state.sizePerPage + this.state.sizePerPage);
        // in a real app you could query the specific page from a server user list
        this.setState({ page, renderedUsers });
    }

    editTable(){
        console.log("edit hehe");
    }
    
    
    changePerPage(e){
        this.setState({
            sizePerPage : Number(e.target.value)
        });
        console.log(Number(e.target.value));
    }

    render(){
        const {leaveList,pages,loading}  = this.props;
        const { page, total, renderedUsers} = this.state;
        // // Example Data
        // const tableData = {
        //     headerCol: ["Project","From Date", "To Date", "Status","Type","Description","User Approved","User Next Approved"],
        //     columns: Object.keys(leaveList[0]),
        //     rows: []
        // };
        // for(var i = 0 ; i<leaveList.length ; i++)
        //     tableData.rows.push(leaveList[i]);
        
            
        const selectData = [10,20,30];

        return(
            
            <div>
                <NavBar/>
                <Header/>
                    
                    <div className="right_col" role="main">
                        <div className={styles.dashboad}>
                            {/* <BlockDashboard text="Leave"/>
                            <BlockDashboard text="Overtime"/> */}
                        </div>
                        {/* <TableComponent data = {tableData} idTable="table1" isCrud={true}/> */}

                        <div>
                            {leaveList && leaveList.map((ov,item)=>{
                                <div>{ov.projectId}</div>
                            })}
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

function mapStateToProps(state) {
    const { leaveList,pages, loading } = state.leaves;
  
    return {
        leaveList,
        loading,
        pages
    };
}

const connectedLeave = connect(mapStateToProps)(Home);
export { connectedLeave as Home };