import React, { Component } from 'react';
import TaskList from './content/TaskList';
import Control from './content/Control';
import Taskform from './content/Taskform';


class PageContent extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [], //id:unique , name , status
            isDisplayForm: false,
            tasksEditing: null
        }
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    s4(){
        return Math.floor((1+Math.random()) *0x10000).toString(16).substring(1);
    }

    gennetateID(){
        return this.s4() + this.s4() + '_' +this.s4() + '_' + this.s4()+ '_' + this.s4()+'_' + this.s4()+'_' + this.s4()+'_' + this.s4();
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id === ''){
            data.id = this.gennetateID();
            tasks.push(data);
        }
        else{
            //Editing
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
           this.setState({
               tasks : tasks,
               tasksEditing : null
           });
           localStorage.setItem('tasks' , JSON.stringify(tasks));  
    }

    onToggleForm = () =>{//them task
        if(this.state.isDisplayForm && this.state.tasksEditing !==null){ 
            
            this.setState({
                isDisplayForm: true,
                tasksEditing: null
             });
             
        }else {   
                this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                tasksEditing: null
             });
        }
    }

    onCloseForm = () =>{
        this.setState({
            isDisplayForm: false
        });
    }

    onShowForm = () =>{
        this.setState({
            isDisplayForm: true
        });

    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
       var index = this.findIndex(id);
       if(index !== -1){
           tasks[index].status = !tasks[index].status;
           this.setState({
               tasks: tasks
           });
           localStorage.setItem('tasks', JSON.stringify(tasks));
       }
    }

    findIndex = (id)=>{
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((tasks, index) =>{
            if(tasks.id === id){
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var tasksEditing = tasks[index];
        this.setState({
            tasksEditing: tasksEditing
        });
        this.onShowForm();
    }

  render() {

    var {tasks , isDisplayForm, tasksEditing } = this.state ;
    var elmTaskForm = isDisplayForm 
            ? <Taskform 
                onSubmit = {this.onSubmit} 
                onCloseForm={this.onCloseForm}
                task={tasksEditing}
                /> 
                : "";
    return (
      <div className="right_col" role="main">
          <div className="">
            <div className="page-title">
              <div className="title_left">
                <h3>Contacts Design</h3>
              </div>

              <div className="title_right">
                <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." />
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">Search</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="clearfix"></div>

            <div className="row">
              <div className="col-md-12">
                <div className="x_panel">
                  <div className="x_content">
                    <div className="row">          
                      <div className="col-md-12 profile_details">
                      {/* form */}
                      <div className="container">
                                <div className="text-center">
                                    <h1>Project</h1>
                                    <hr/>
                                </div>
                                <div className="row">
                                <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':'' }>
                                {/* form */}
                                    {elmTaskForm}
                                </div>
                                <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
                                        'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                                    <button
                                        type="button" 
                                        className="btn btn-success"
                                        onClick={this.onToggleForm}
                                        >
                                        <span className="fa fa-plus mr-5"></span>Add Project
                                    </button>
                                    {/*Search-Sort*/}
                                        <Control />
                                    {/*List*/}
                                        <TaskList tasks = { tasks } 
                                        onUpdateStatus = {this.onUpdateStatus} 
                                        onDelete = {this.onDelete}
                                        onUpdate = {this.onUpdate}
                                        />
                                </div>
                                </div>
                                
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <ul className="pagination pagination-split">
                          <li><a href="">1</a></li>
                          <li><a href="">2</a></li>
                          <li><a href="">3</a></li>
                          <li><a href="">Next</a></li>
                          
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

export default PageContent;

