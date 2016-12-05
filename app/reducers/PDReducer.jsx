export var pdTextReducer = (state = 'QQQQQQ', action)=>{
    switch (action.type){
        case 'SET_PD_TEXT':
            return action.pdText;
        default:
            return state;
    }
}
