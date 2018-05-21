import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.tasks.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.tasks.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.tasks.id);
    }

  render() {
      var {tasks , index} = this.props; 
    return (
        <tr>
        <td>{index + 1}</td>
        <td>{tasks.name}</td>
        <td>20/5/2018</td>
        <td>10/09/2018</td>
        <td className="text-center">
            <span 
                className={tasks.status === true ?'label label-success' : 
                        'label label-danger'}
                onClick={this.onUpdateStatus}     
                 >{tasks.status === true ? 'OnLine' : 'OffLine'}</span>
        </td>
        <td>Khối A</td>
        <td className="text-center">
            <button type="button" className="btn btn-info">
                <span className="fa fa-eye mr-5"></span>Detail
            </button>
            <button 
                type="button" 
                className="btn btn-success"
                onClick = {this.onUpdate}
                >
                <span className="fa fa-pencil mr-5"></span>Edit
            </button>
            <button 
            type="button" 
            className="btn btn-danger"
            onClick={ this.onDelete}
            >
                <span className="fa fa-trash-o mr-5"></span>Delete
            </button>
        </td>
    </tr>
    );
  }
}

export default TaskItem;
