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

export var openSingleDR = (record) =>{
    return{
        type:'OPEN_SINGLE_DR',
        record
    }
}

export var closeSingleDR = () =>{
    return{
        type:'CLOSE_SINGLE_DR'
    }
}

export var updateDRSearchText = (text) =>{
    return {
        type:'UPDATE_DR_SERACHTEXT',
        text
    }
}
