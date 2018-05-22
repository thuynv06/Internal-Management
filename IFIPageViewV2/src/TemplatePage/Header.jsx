import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
import $ from 'jquery';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.clickMenu = this.clickMenu.bind(this);
        
        
    }
    componentDidMount() {
        this.setContentHeight();
    }
    


    clickMenu(){
            console.log('clicked - menu toggle');
            
            if ($('body').hasClass('nav-md')) {
                $('#sidebar-menu').find('li.active ul').hide();
                $('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
            } else {
                $('#sidebar-menu').find('li.active-sm ul').show();
                $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
            }
    
            $('body').toggleClass('nav-md nav-sm');
            
        
            // // reset height
            // $('.right_col').css('min-height', $(window).height());

            // var bodyHeight = $('body').outerHeight(),
            //     footerHeight = $('body').hasClass('footer_fixed') ? -10 : $('footer').height(),
            //     leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
            //     contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

            // // normalize content
            // contentHeight -= $('.nav_menu').height() + footerHeight;

            // $('.right_col').css('min-height', contentHeight);
        
            // $('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });

            this.checkRequire();
        
    }
    


    setContentHeight = function () {
            // reset height
            $('.right_col').css('min-height', $(window).height());
        
            var bodyHeight = $('body').outerHeight(),
                footerHeight = $('body').hasClass('footer_fixed') ? -10 : $('footer').height(),
                leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
        
            // normalize content
            contentHeight -= $('.nav_menu').height() + footerHeight;
        
            $('.right_col').css('min-height', contentHeight);
        };

        checkRequire = function () {
            $('#sidebar-menu').find('a[href="' + window.location.href.split('#')[0].split('?')[0] + '"]').parent('li').addClass('current-page');

            $('#sidebar-menu').find('a').filter(function () {
                return this.href == window.location.href.split('#')[0].split('?')[0];
            }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
                // reset height
                $('.right_col').css('min-height', $(window).height());

                var bodyHeight = $('body').outerHeight(),
                    footerHeight = $('body').hasClass('footer_fixed') ? -10 : $('footer').height(),
                    leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
                    contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

                // normalize content
                contentHeight -= $('.nav_menu').height() + footerHeight;

                $('.right_col').css('min-height', contentHeight);
            }).parent().addClass('active');

            // recompute content when resizing
            
            // reset height
            $('.right_col').css('min-height', $(window).height());

            var bodyHeight = $('body').outerHeight(),
                footerHeight = $('body').hasClass('footer_fixed') ? -10 : $('footer').height(),
                leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
                contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

            // normalize content
            contentHeight -= $('.nav_menu').height() + footerHeight;

            $('.right_col').css('min-height', contentHeight);

            // fixed sideba r
            if ($.fn.mCustomScrollbar) {
                $('.menu_fixed').mCustomScrollbar({
                    autoHideScrollbar: true,
                    theme: 'minimal',
                    mouseWheel:{ preventDefault: true }
                });
            }
        }
    

    render(){
        return(
            // <!-- top navigation -->
        <div className="top_nav">
            <div className="nav_menu">
                <nav>
                <div className="nav toggle">
                    <a id="menu_toggle" onClick={this.clickMenu}><i className="fa fa-bars"></i></a>
                    {/* <a >IFI Solution - An NTT Data Company</a> */}
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login"><i className="fa fa-sign-out pull-right"></i> Log Out</Link></li>
                    <li className="">
                    <a className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <img src="assets/images/img.jpg" alt=""/>Nguyen Diep
                    </a>
                    </li>
                    <li><div className="runtext-container">
                        <div className="main-runtext">
                            <marquee direction="">
                                <div className="holder">
                                    <div className="text-container">
                                &nbsp; &nbsp; <img src="http://www.ifisolution.com/wp-content/themes/steel/images/favicon.png"/>
                                &nbsp; <a data-fancybox-group="gallery" className="fancybox" href="http://www.ifisolution.com/wp-content/themes/steel/images/favicon.png" title="IFI SOLUTION">
                                IFI Solution là Công ty thành viên của Tập đoàn NTT Data chuyên thực hiện các dự án phần mềm cho khách hàng Pháp, Ý, Nhật bản</a>
                                    </div>
                                </div>
                            </marquee>
                        </div>
                </div></li>
                </ul>
                </nav>
                
            </div>
            
        </div>
        /* <!-- /top navigation --> */
        );
    }
}