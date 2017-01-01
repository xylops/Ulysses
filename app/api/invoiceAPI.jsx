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
            json:true
        })
    },
    printInvoice:function(invoice){
        return axios({
            method:'post',
            url:'/IV/printInvoice',
            params:{
                invoice
            },
            json:true
        })
    },
    voidInvoice:function(invoiceID){
        return axios({
            method:'post',
            url:'/IV/voidInvoice',
            params:{
                invoiceID
            },
            json:true
        })
    },
    getAllInvoice:function(){
        return axios.get('/IV/getAllInvoice').then(function(res){
            return res
        })
    }
}
