export var toggleSnackBar = (state = {open:false, text:""}, action)=>{
    switch (action.type){
        case 'OPEN_SNACKBAR':
            return {
                open:true,
                text:action.text
            };
        case 'CLOSE_SNACKBAR':
            return {
                open:false,
                text:""
            };
        default:
            return state;
    }
}
