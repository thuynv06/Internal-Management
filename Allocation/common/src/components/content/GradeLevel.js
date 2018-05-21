import React, { Component } from 'react';

class GradeLevel extends Component {
  render() {
    return (
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Grade Level <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                    <a role="button">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Khối A
                                </span>
                            </a>
                </li>
                <li>
                    <a role="button">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Khối B
                                </span>
                            </a>
                </li>
                <li role="separator" className="divider"></li>
                <li><a role="button">Khối C</a></li>
                <li><a role="button">Khối D</a></li>
            </ul>
        </div>
    </div>
    );
  }
}

export default GradeLevel;