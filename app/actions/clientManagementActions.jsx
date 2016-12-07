export var toggleCreateNewClientDialog = () =>{
    return {
        type:'TOGGLE_CREATE_NEW_CLIENT_DIALOG',
    }
}

export var startFetchClientList = () =>{
    return{
        type:'START_CLIENT_LIST_FETCH'
    }
}

export var completeFetchClientList = (CL) =>{
    return{
        type:'COMPLETE_CLIENT_LIST_FETCH',
        CL
    }
}

export var openSingleClientDialog = (SC)=>{
    return {
        type:'OPEN_SINGLE_CLIENT_DIALOG',
        SC
    }
}

export var closeSingleClientDialog = ()=>{
    return {
        type:'CLOSE_SINGLE_CLIENT_DIALOG'
    }
}
