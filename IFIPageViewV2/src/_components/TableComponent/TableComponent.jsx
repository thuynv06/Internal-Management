import React from 'react';
import TableHeader from './TableHeaderComponent';
import TableBody from './TableBodyComponent';

export default class TableComponent extends React.Component{
    
    render(){
        const data = this.props.data;
        const isCrud= this.props;
        return(
            <table className="table table-bordered table-hover" id="tableLeave">
                <TableHeader data={this.props.data} isCrud={this.props.isCrud}/>
                <TableBody data={this.props.data} isCrud={this.props.isCrud}/>
            </table>
        )
    }
}