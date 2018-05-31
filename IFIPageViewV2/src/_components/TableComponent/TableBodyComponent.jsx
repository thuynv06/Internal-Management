import React from 'react';
import Button from '../Button';


export default class TableBody extends React.Component{
    constructor(props){
        super(props);
        this.handleClickRow = this.handleClickRow.bind(this);
        this.edit = this.edit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    edit(){
        alert("edit");
    }
    handleDelete(id){
        // alert("delete " + id);
        this.props.valueDelete(id);
    }

    handleClickRow(data){
        alert(data);
    }

    render(){
        const dataRows = this.props.data.rows;
        const dataColumns = this.props.data.columns;
        const {isCrud}=this.props;
        return(
            
            <tbody>
                
                {dataRows.map(function(row,index){
                    return(
                        <tr key={index} colindex={index+1}>
                            {dataColumns.filter(p => p !=='id').map(function(column,index){
                                return <td key={index}><div className="brief-text">{row[column]}</div></td>;
                            })}
                            {isCrud &&
                                  <td><Button type="button" onClick={this.props.onClick}>Edit</Button>
                                 {/* <td>
                                     <Button type="button" onClick={() =>this.handleClickRow(row[dataColumns[0]])}>Edit</Button> */}
                                </td>
                            }
                            {isCrud &&
                                <td><Button type="button" btn="success"  type="submit" onClick={() => this.handleDelete(row['id'])}>Delete</Button></td>
                            }
                        </tr>);
                }.bind(this))}
            </tbody>
        );
    }
}