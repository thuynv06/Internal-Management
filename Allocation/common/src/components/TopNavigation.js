import React, { Component } from 'react';


class TopNavigation extends Component {
  render() {
    return (
      <div className="top_nav">
          <div className="nav_menu">
            <nav>
              <div className="nav toggle">
                <a id="menu_toggle"><i className="fa fa-bars"></i></a>
              </div>

              <ul className="nav navbar-nav navbar-right">
                <li className="">
                  <a href="" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="images/img.jpg" alt="" />John Doe
                    <span className =" fa fa-angle-down"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href=""> Profile</a></li>
                    <li>
                      <a href="">
                        <span className="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                      </a>
                    </li>
                    <li><a href="">Help</a></li>
                    <li><a href="login.html"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>

                <li role="presentation" className="dropdown">
                  <a href="" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-envelope-o"></i>
                    <span className="badge bg-green">1</span>
                  </a>
                  <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                    <li>
                      <a>
                        <span className="image"><img src="images/img.jpg" alt="" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

    );
  }
}

export default TopNavigation;
