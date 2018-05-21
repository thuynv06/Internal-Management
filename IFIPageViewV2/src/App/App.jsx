import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';

import TableHeaderComponent from '../_components/TableHeaderComponent';
import TableBody from '../_components/TableBody';
import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import SelectListComponent from '../_components/SelectListComponent';

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





var data = [
	{Invoice:'121000040', InvoiceDate:'May 23, 2014 11:47:56 PM' , BilltoName:'John A', Status:'Paid', Amount:'$7.45'},
	{Invoice:'121000041', InvoiceDate:'May 24, 2015 11:47:56 PM' , BilltoName:'John C', Status:'Paid', Amount:'$14.45'},
	{Invoice:'121000042', InvoiceDate:'May 25, 2016 11:47:56 PM' , BilltoName:'John D', Status:'Paid', Amount:'$21.45'}
];


class App extends React.Component {

    elements = data.map((data, index) =>{
        return 	<TableBody key={data.Invoice} Invoice={data.Invoice} InvoiceDate={data.InvoiceDate} BilltoName={data.BilltoName} Status={data.Status} Amount={data.Amount}>
              </TableBody>
      });
    constructor(props){

        
        super(props);this.state = {
            rows: [],
            columns: [],
            clicked: false
        }
        history.push('/home');
    }
   
    
    render() {

        
        const basePath = '/' + window.location.pathname.split('/')[1];
        console.log(basePath);
        
        const styleButton = {
            height: "40px", color: "yellow", width: "10%" ,fontsize: "20px" ,background:"green" ,borderRadius:"10px"
        };
        const styleHeaderTable={
            height: "40px", color: "#ffff", width: "100px", fontsize: "15px", background: "#23527C"
        };
        return (
                <div className={styles.container_wrap}>
                    <div className="container ">
                        Username
                        <InputComponent name="diep" type="text" value="root" placeholder="Username" icon="fa fa-user"/>
                        Password
                        <InputComponent name="diep" type="password" value="123564" placeholder="Password" icon="fa fa-unlock"/>
                    </div>
                    <Button type="submit" {...styleButton}>
                        Login
                    </Button>

                    <br/>
                    <div className={styles.tableHeader}>
                    <table id = "table1">
                        <thead>
                    
                       <tr>
                       <TableHeaderComponent {...styleHeaderTable}>
                            <input type="checkbox" id="check-all" className="flat"/>       
		                </TableHeaderComponent>
                        <TableHeaderComponent idTable = "table1" colIndex = "1" {...styleHeaderTable} border="1px">Invoice</TableHeaderComponent>
                        <TableHeaderComponent idTable = "table1" colIndex = "2" {...styleHeaderTable}>Invoice Date</TableHeaderComponent>
                        <TableHeaderComponent idTable = "table1" colIndex = "3" {...styleHeaderTable}>Bill to Name</TableHeaderComponent>
                        <TableHeaderComponent idTable = "table1" colIndex = "4" {...styleHeaderTable}>Status</TableHeaderComponent>
                        <TableHeaderComponent idTable = "table1" colIndex = "5" {...styleHeaderTable}>Amount</TableHeaderComponent>
                        <TableHeaderComponent {...styleHeaderTable}><span className="nobr">Action</span></TableHeaderComponent>
		                    
                        </tr>
                        </thead>
                        <tbody>
                            {this.elements}
                        </tbody>
                    </table>
                        
                    </div>
                <br/> 
                <div className={styles.dashboad}>
                    <BlockDashboard text="Leave"/>
                </div>

                <SelectListComponent/>


                {/* NavBar */}
                {/* <NavBar/>
                <Header/>
                <Router history={history}>
                    <div>
                        <Route path="/home" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/pages/leave" render={() => console.log("Leave Page")} />
                    </div>
                </Router>
                <Footer/> */}
                </div>
                
        );
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
