import React from 'react';

export default class TableBody extends React.Component{
    render(){
        const dataRows = this.props.data.rows;
        const dataColumns = this.props.data.columns;
        
        return(
            <tbody>
                {dataRows.map(function(row){
                    return(
                        <tr>
                            {dataColumns.map(function(column){
                                return <td>{row[column]}</td>;
                            })}
                        </tr>);
                })}
            </tbody>
        );
    }
}