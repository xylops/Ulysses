export var createNewClientDialog = (state = false, action)=>{
    switch (action.type){
        case 'TOGGLE_CREATE_NEW_CLIENT_DIALOG':
            return !state;
        default:
            return state;
    }
}
