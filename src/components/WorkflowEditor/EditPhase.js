import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditTask from './EditTask';

class EditPhase extends Component {

    state={
        edit: false,
        task:{
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            time: new Date()
        }
        
    }

    editOptions=()=>{
        this.setState({edit:true})
    }

    handleChange=(e, propertyName)=>{
        this.setState({
            task:{
                ...this.state.task,
                [propertyName]: e.target.value
            }
        })
    }

    handleSubmit=(e, id)=>{
        e.preventDefault();
        this.setState({edit:false});
        const nextSequence = (Math.max(...this.props.reduxState.workflow.thisPhase.map(task=>task.task_sequence),0)+1);	
        if(id === null){
            this.props.dispatch({type: 'ADD_NEW_TASK', payload: {id: this.props.phaseId, task:this.state.task, seq: nextSequence}})
        }else{
            this.props.dispatch({type: 'EDIT_TASK_NAME', payload: {id: this.props.phaseId, task:this.state.task}})
        }
    }

    render() {

        const wfID = this.props.wfID;

        return (
            <>
            {this.props.edit === false
            ?
            <>
            <div></div>
            </>
            :
            <>
                <form data-id={this.props.id} onSubmit={(e)=>this.handleSubmit(e, this.props.id)}>
                    <label htmlFor="task-name">Task Title: 
                        <input type="text" data-id={this.props.id} value={this.state.task.name || ""} placeholder="enter title for task" onChange={(e)=>this.handleChange(e, 'name')} />
                    </label>
                    <br/>
                    <label htmlFor="task-desctioption">Description: 
                        <input type="text" size="50" data-id={this.props.id} value={this.state.task.description || ""} placeholder="enter description for task" onChange={(e)=>this.handleChange(e, 'description')} />
                    </label>
                    <br/>
                    <input type="submit" value="save" className="button"/>
                </form>
                <button onClick={this.editOptions} className="btn-sml">Edit Task Options</button>
                <hr width="250em"/>
                {this.state.edit === true &&
                    <EditTask
                        wfID={wfID}
                        taskID={this.props.id}
                        phaseID={this.props.phaseId}
                     />
                }
            </>
            }
            </>
        );
    }
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditPhase);