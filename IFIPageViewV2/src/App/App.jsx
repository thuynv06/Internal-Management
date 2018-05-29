import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import styles from './css/style.css';
import InputComponent from '../_components/InputComponent';
import Button from '../_components/Button';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

import DatePickerComponent from '../_components/DatePickerComponent';

import BlockDashboardNotificationComponent from '../_components/BlockDashboardNotificationComponent';


import TableHeaderComponent from '../_components/TableHeaderComponent';
import TableBody from '../_components/TableBody';

import BlockDashboard from '../_components/BlockDashboardNotificationComponent';
import SelectListComponent from '../_components/SelectListComponent';
import DateTimeComponent from '../_components/DateTimeComponent';

import NavBar from '../TemplatePage/NavBar';
import Header from '../TemplatePage/Header';
import Footer from '../TemplatePage/Footer';
import { history } from '../_helpers/history.js';
import { alertActions } from '../_actions/alert.actions.js';
import {mypageActions} from '../_actions/mypage.actions.js';

import './css/custom.js';
import Home from '../Pages/Home';
import MyLeave from '../Pages/MyLeave';
import Login from '../Pages/Login';










var data = [
    {Invoice:'121000043', InvoiceDate:'May 23, 2014 11:47:56 PM' , BilltoName:'John F', Status:'Paid'},
	{Invoice:'121000040', InvoiceDate:'May 23, 2014 11:47:56 PM' , BilltoName:'John A', Status:'Paid'},
	{Invoice:'121000041', InvoiceDate:'May 24, 2015 11:47:56 PM' , BilltoName:'John C', Status:'Paid'},
	{Invoice:'121000042', InvoiceDate:'May 25, 2016 11:47:56 PM' , BilltoName:'John D', Status:'Paid'}
];

var dataHeader = [
     {name:'Invoice',check:true}, {name:'Invoice Date',check:true},  {name:'Invoice Name',check:true}, {name:'Status',check:false},{ name:'Action',check:false}
    
];


class App extends React.Component {



    elements = data.map((data, index) =>{
        return 	<TableBody key={data.Invoice} Invoice={data.Invoice} InvoiceDate={data.InvoiceDate} BilltoName={data.BilltoName} Status={data.Status} Amount={data.Amount}>

              </TableBody>
      });
      
    nameHeader=dataHeader.map((dataHeader,index)=>{
        const styleHeaderTable={
            height: "40px", color: "#ffff", width: "150px", fontsize: "15px", background: "#23527C"
        };
        
        return <TableHeaderComponent idTable="table1" colindex={''+(index+1)} check={dataHeader.check} {...styleHeaderTable}>
            {dataHeader.name}
           
        </TableHeaderComponent>
            
        
    });




    constructor(props){

        history.push("/");


        super(props);this.state = {

            rows: [],
            columns: [],
            clicked: false
        };
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(){
       
        this.props.dispatch(mypageActions.openPopup());
       
    };
    render() {

        const {isOpen} = this.props;
        const basePath = '/' + window.location.pathname.split('/')[1];
        console.log(basePath);

        const styleButton = {
            height: "40px", color: "yellow", width: "10%" ,fontSize: "20px" ,background:"green" ,borderradius:"10px"
        };
        const styleHeaderTable={
            height: "40px", color: "#ffff", width: "100px", fontSize: "15px", background: "#23527C"
        };

        
        return (
            // <div>
                 
            //     <button type="button"  onClick={this.handleLogin} {...styleButton}>
            //         Login
            //     </button>
            //     {isOpen && <div><h1>Hello</h1></div>}
            //  </div>			
        
        
                // <div className={styles.container_wrap}>
                //     <div className="container ">
                //         Username
                //         <InputComponent name="diep" type="text" value="root" placeholder="Username" icon="fa fa-user"/>
                //         Password
                //         <InputComponent name="diep" type="password" value="123564" placeholder="Password" icon="fa fa-unlock"/>
                //     </div>
               	//
                //     <br/>
                //     <diisOpenv className={styles.tableHeader}>
                //     <taisOpenble id = "table1">
                //        isOpen <thead>
					//	isOpen		
                //        isOpen<tr>
                //        isOpen<TableHeaderComponent {...styleHeaderTable}>
                //        isOpen     <input type="checkbox" id="check-all" className="flat"/>
		            //    isOpen </TableHeaderComponent>
                //        isOpen <TableHeaderComponent idTable = "table1" colIndex = "1" {...styleHeaderTable} border="1px">Invoice</TableHeaderComponent>
                //         <TableHeaderComponent idTable = "table1" colIndex = "2" {...styleHeaderTable}>Invoice Date</TableHeaderComponent>
                //         <TableHeaderComponent idTable = "table1" colIndex = "3" {...styleHeaderTable}>Bill to Name</TableHeaderComponent>
                //         <TableHeaderComponent idTable = "table1" colIndex = "4" {...styleHeaderTable}>Status</TableHeaderComponent>
                //         <TableHeaderComponent idTable = "table1" colIndex = "5" {...styleHeaderTable}>Amount</TableHeaderComponent>
                //         <TableHeaderComponent {...styleHeaderTable}><span className="nobr">Action</span></TableHeaderComponent>
								//
                //         </tr>
                //         </thead>
                //         <tbody>
                //             {this.elements}
                //         </tbody>
                //     </table>
								//
                //     </div>
                // <br/>
                // <div className={styles.dashboad}>
                //     <BlockDashboard text="Leave"/>
                // </div>
								//
                // <SelectListComponent/>


           <div>
                <Router history={history}>
                <div>
                        <Route exact path="/home"  component={Home} />
                        <Route exact path="/"  component={Home} />
                        <Route path="/login"  component={Login} />
                        <Route path="/pages/leave" component={MyLeave} />
                     

                </div>
				</Router>

               
			</div>


        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { isOpen } = state.popup;
    return {
        alert,
        isOpen,
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
