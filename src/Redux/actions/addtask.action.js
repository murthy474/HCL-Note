import * as actionType from './action_types'

export function addtaskload () {
    return {
      type: actionType.ADDTASK_LOAD
    }
  }
  
  export function addtasksuccess (taskList) {
    return {
      type: actionType.ADDTASK_SUCCESS,
      taskList
    }
  }
  
  export function addtaskclear () {
    return {
      type: actionType.ADDTASK_FAILURE
    }
  }