import update from 'react-addons-update';

export var fetchNonProcessInvoice = (state = {isFetching: false , NPI: []}, action) => {
    switch (action.type){
        case 'START_NONPORCESS_INVOICE':
            return{
                isFetching:true,
                NPI:[]
            }
        case 'COMPLETE_NONPORCESS_INVOICE':
            return{
                isFetching:false,
                NPI: action.NPI
            }
        default:
            return state
    }
}
