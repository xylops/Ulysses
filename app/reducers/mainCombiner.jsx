import { combineReducers } from 'redux'
import {changeNavBarText} from './mainReducer'


export default combineReducers({
    NavBarText: changeNavBarText
})
