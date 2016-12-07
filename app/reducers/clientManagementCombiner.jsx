import { combineReducers } from 'redux'
import {createNewClientDialog, fetchClientList, toggleSingleClientDialog} from './clientManagementReducer'


export default combineReducers({
    createNewClientDialog,
    clientData: fetchClientList,
    singleClient: toggleSingleClientDialog,
})
