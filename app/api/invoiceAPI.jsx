var axios = require('axios');

module.exports = {
    checkInvoicePerDay:function(date){
        return axios({
            method:'post',
            url:'/IV/checkInvoicePerDay',
            params:{
                date
            },
            json:true
        })
    },
    createNewInvoice:function(invoice){
        return axios({
            method:'post',
            url:'/IV/createNewInvoice',
            params:{
                invoice
            },
            // json:true
        })
    },
}
