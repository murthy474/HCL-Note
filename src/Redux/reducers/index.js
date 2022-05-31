import { combineReducers } from 'redux';
import {default as AppReducers} from './reducer_app'

const appReducer = combineReducers({
    addTaks: AppReducers.AddtaskReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer