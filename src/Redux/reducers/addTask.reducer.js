import * as actionTypes from '../actions/action_types'
const taskInitialState = {
  data: null,
  status: '',
  error: false
}

const INITIAL_STATE = {
  tasklist: taskInitialState
}

export function AddtaskReducer (state = [], action = {}) {
  switch (action.type) {
    case actionTypes.ADDTASK_LOAD: {
      const newData = {...state.tasklist, status: action.status}
      const requested = Object.assign({}, state, { tasklist: newData })
      return requested
    }
    case actionTypes.ADDTASK_SUCCESS: {
      const newData = {...state.tasklist, status: action.status, data: action.taskList}
      const successful = Object.assign({}, state, {tasklist: newData})
      return successful
    }
    case actionTypes.ADDTASK_FAILURE: {
      const newData = {...state.tasklist, status: action.status, error: action.error}
      const failed = Object.assign({}, state, {tasklist: newData})
      return failed
    }
    default: {
      return state
    }
  }
}
