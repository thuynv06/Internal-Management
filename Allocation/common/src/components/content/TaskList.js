import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  render() {
    var {tasks} = this.props;
    var emlTasks = tasks.map((tasks, index) => {
        return <TaskItem 
                key={tasks.id} 
                index={index} 
                tasks={tasks}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete = {this.props.onDelete}
                onUpdate = {this.props.onUpdate}
            />
    });
    return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Name Project</th>
                        <th className="text-center">Start Date</th>
                        <th className="text-center">End Date</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Grade Level</th>
                        <th className="text-center" style={{ width: 300}} >Proceed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" />
                        </td>
                        <td>
                            <select className="form-control">
                                <option value="-1">All</option>
                                <option value="0">Online</option>
                                <option value="1">Offline</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {emlTasks}
                </tbody>
            </table>
     
    );
  }
}

export default TaskList;
