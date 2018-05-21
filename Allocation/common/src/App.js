import React, { Component } from 'react';
import Header from './components/Header';
import PageContent from './components/PageContent';
import SidebarMenu from './components/SidebarMenu';
import TopNavigation from './components/TopNavigation';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className="container body">
      <div className="main_container">
        <div className="col-md-3 left_col">
          	<div className="left_col scroll-view">
	            <div className="navbar nav_title" style={{border: 0}}>

	              <a href="index.html" ><span><img src="http://www.ifisolution.com/wp-content/uploads/2017/09/logo-big.png" className="site_title_ifi" alt=""/></span></a>
	            </div>
	            <div className="clearfix" id ="ifi_img"></div>
              <div>

              </div>

	            <br />
              <br/>
              <br />
              <br/>
              <br />
              <br/>
              <br />
              <br/>
              <br />
              <br/>

	            <SidebarMenu />
            </div>
        </div>

        <TopNavigation />

        <PageContent />
    	</div>
    </div>


    );
  }
}

export default App;
