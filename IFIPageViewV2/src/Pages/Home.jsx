import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import { Router, Route } from 'react-router';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import styles from './css/pages.css';
import TableComponent from '../_components/TableComponent/TableComponent';
import HeaderComponet from '../_components/TableComponent/TableHeaderComponent';
import BodyComponent from '../_components/TableComponent/TableBodyComponent';
import SelectListComponent from '../_components/SelectListComponent';
import Pagination from '../_components/PaginationComponentGoogle';

import { leaveActions } from '../_actions/leave.actions.js';
import convertData from '../_convertData/convertData.js';

class Home extends React.Component{
    
    constructor(props){
        super(props);
        var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
        this.state = {
            users: [],
            renderedUsers: [],
            loading: true,
            pages:0,
            page: 1,
            sizePerPage:10,
            status:0,
            rows:[],
            exampleItems: exampleItems,
            pageOfItems: []
        };

        

        // this.state = {
            
        //     pageOfItems: []
        // };
        
        this.handlePageChange = this.handlePageChange.bind(this);
        
    }

    componentDidMount() {
        this.fetchData();
        // In a real app we make an http request
        // setTimeout(() => {
        //     this.setState({ users, renderedUsers: users.slice(0, this.state.sizePerPage), total: this.props.leaveList.length });
        // })
        this.setState({
            users: this.props.tableData
        });
    }

    fetchData(){

        this.props.dispatch(leaveActions.getLeaveByPage());

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
        // const myObj = JSON.parse(leaveList);


        <div className={styles.dashboad}>
                            <BlockDashboard text="Leave"/>
                        </div>
        return(

            <div>
                <NavBar/>
                <Header/>
                    <div className="right_col" role="main">
                        <div className={styles.dashboad}>
                            <BlockDashboard text="Leave"/>
                            <BlockDashboard text="Overtime"/>
                        </div>
                        {/* <TableComponent data = {tableData} idTable="table1" isCrud={true}/> */}

                        <div>
                            {console.log(leaveList)}
                            {leaveList &&
                            <TableComponent data = {convertData(leaveList,["Created At","NAME","AVATAR"],[])} isCrud={true}/>}
                            <Pagination items={this.state.exampleItems}/>
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
