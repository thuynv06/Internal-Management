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
        
        this.state = {
            users: [],
            renderedUsers: [],
            loading: true,
            pages:0,
            page: 1,
            sizePerPage:10,
            status:0,
            rows:[],
            
            pageOfItems: []
        };

        

        // this.state = {
            
        //     pageOfItems: []
        // };
        
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.changePerPage = this.changePerPage.bind(this);
        
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

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
        console.log(pageOfItems);
    }

    
    render(){
        const {leaveList,pages,loading}  = this.props;
        const { page, total, renderedUsers,pageOfItems} = this.state;

        
            
        const selectData = [10,20,30];


        <div className={styles.dashboad}>
                            <BlockDashboard text="Leave"/>
                        </div>
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
                            {pageOfItems.length != 0 ? console.log(pageOfItems) : console.log('huhu')}
                            {pageOfItems.length != 0 ?
                            <TableComponent data = {convertData(pageOfItems,["Created At","NAME","AVATAR"],[])} isCrud={true}/> : null}
                            
                            <Pagination items={leaveList} onChangePage={this.onChangePage}/>
                            
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
