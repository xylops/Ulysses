import { combineReducers } from 'redux'
import {pdTextReducer} from './PDReducer'


export default combineReducers({
  pdText: pdTextReducer,
})
