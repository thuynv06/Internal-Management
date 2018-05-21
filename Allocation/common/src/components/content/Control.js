import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import GradeLevel from './GradeLevel';

class Control extends Component {
  render() {
    return (
        <div className="row mt-15">
        {/*Search*/}
            <Search />
        {/*Sort*/}
            <Sort />
        {/* Grade Level*/}
            <GradeLevel />
     </div>
    );
  }
}

export default Control;