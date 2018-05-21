import React, { Component } from 'react';

class SidebarMenu extends Component {
  render() {
    return (
    	<div id="sidebar-menu" className="main_menu_side hidden-print main_menu anh1">

        <div className="menu_section">
          <h3>Manager</h3>

          <ul className="nav side-menu">

            
            <li><a><i className="fa fa-home"></i> Home <span className="fa fa-chevron-down"></span></a>
              <ul className="dropdown-menu">
              <li>
                    <a role="button">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Name A-Z
                                </span>
                            </a>
                </li>
                <li><a href="#">Dashboard2</a></li>
                <li><a href="#">Dashboard3</a></li>
              </ul>
            </li>

            <li>
              <a><i className="fa fa-users"></i>  Employee Manager<span className="fa fa-chevron-down"></span></a>
              <ul className="nav child_menu">
                <li><a href="">General Form</a></li>
                <li><a href="">Advanced Components</a></li>

              </ul>
            </li>

            <li>
              <a><i className="fa fa-sitemap"></i> Project Management <span className="fa fa-chevron-down"></span></a>
              <ul className="nav child_menu">
                <li><a href="#l">General Elements</a></li>
                <li><a href="#">Media Gallery</a></li>

              </ul>
            </li>

            <li><a><i className="fa fa-file"></i> Report <span className="fa fa-chevron-down"></span></a>
              <ul className="nav child_menu">
                <li><a href="#">Tables</a></li>
                <li><a href="#">Table Dynamic</a></li>
              </ul>
            </li>

            <li><a><i className="fa fa-bar-chart-o"></i> Statistics <span className="fa fa-chevron-down"></span></a>
              <ul className="nav child_menu">
                <li><a href="#">Tables</a></li>
                <li><a href="#">Table Dynamic</a></li>
              </ul>
            </li>
          </ul>
          
        </div>

      </div>

    );
  }
}

export default SidebarMenu;
