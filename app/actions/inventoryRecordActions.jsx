export var startFetchIRL = () =>{
    return{
        type:'START_FETCHING_IRL'
    }
}

export var completeFetchIRL = (IRL) =>{
    return{
        type:'COMPLETE_FETCHING_IRL',
        IRL
    }
}
