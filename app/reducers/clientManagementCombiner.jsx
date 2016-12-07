import { combineReducers } from 'redux'
import {createNewClientDialog, fetchClientList, toggleSingleClientDialog, clientFilterText} from './clientManagementReducer'


export default combineReducers({
    createNewClientDialog,
    clientData: fetchClientList,
    singleClient: toggleSingleClientDialog,
    clientFilterText
})
