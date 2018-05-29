import React from 'react';
import TableHeader from './TableHeaderComponent';
import TableBody from './TableBodyComponent';

export default class TableComponent extends React.Component{
    
    render(){
        const data = this.props.data;
        return(
            <table className="table table-bordered table-hover">
                <TableHeader data={this.props.data}/>
                <TableBody data={this.props.data}/>
            </table>
        )
    }
}