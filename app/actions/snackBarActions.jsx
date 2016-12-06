export var openSnackBar = (text) =>{
    return {
        type:'OPEN_SNACKBAR',
        text
    }
}

export var closeSnackBar = () =>{
    return {
        type:'CLOSE_SNACKBAR',
    }
}
