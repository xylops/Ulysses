export var startFetchingDR = () =>{
    return{
        type:'START_FETCHING_DR'
    }
}

export var completeFetchingDR = (DR) =>{
    return{
        type:'COMPLETE_FETCHING_DR',
        DR
    }
}

export var updateSingleDR = (record) =>{
    return{
        type:'UPDATE_SINGLE_DR',
        record
    }
}
