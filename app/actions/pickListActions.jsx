export var startFetchPickList = () =>{
    return{
        type:'START_FETCHING_PICKLIST',
    }
}

export var completeFetchPickList = (PL) =>{
    return{
        type:'COMPLETE_FETCHING_PICKLIST',
        PL
    }
}
