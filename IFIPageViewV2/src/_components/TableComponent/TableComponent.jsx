import React from 'react';
import TableHeader from './TableHeaderComponent';
import TableBody from './TableBodyComponent';

export default class TableComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={valueDelete:0}
    }
    
    
    handleDelete(value){
        //alert(value);
        this.props.onDelete(value);
        this.setState({valueDelete: value});
    }
    
    

    render(){
        const data = this.props.data;
        const {isCrud,handleDelete}= this.props;
        return(
            <table className="table table-bordered table-hover">
                <TableHeader data={this.props.data} isCrud={this.props.isCrud}/>
                <TableBody data={this.props.data} isCrud={this.props.isCrud} valueDelete={this.handleDelete.bind(this)}/>
            </table>
        )
    }
}