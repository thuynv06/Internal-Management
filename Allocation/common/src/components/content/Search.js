import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
        
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter keywords..." />
            <span className="input-group-btn">
                        <button className="btn btn-primary" type="button">
                            <span className="fa fa-search mr-5"></span> Search
            </button>
            </span>
        </div>
    </div>
    )
  }
}

export default Search;