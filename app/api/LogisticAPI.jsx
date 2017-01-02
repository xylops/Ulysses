var axios = require('axios');

module.exports = {
    getNonProcessInvoice:function(){
        return axios.get('/LGSI/getNonProcessInvoice').then(function(res){
            return res
        })
    },
}
