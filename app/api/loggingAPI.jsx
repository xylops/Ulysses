var axios = require('axios');

module.exports = {
    queryLog:function(queryLog){
        return axios({
            method:'post',
            url:'/LOG/queryLog',
            params:{
                queryLog
            },
            json:true
        })
    },
}
