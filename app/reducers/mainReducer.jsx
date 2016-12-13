export var changeNavBarText = (state = "ERP Solution", action)=>{
    switch (action.type){
        case 'CHANGE_NAVBAR_TEXT':
            return state = action.text;
        default:
            return state;
    }
}
