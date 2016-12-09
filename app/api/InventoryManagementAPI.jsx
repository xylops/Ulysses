var axios = require('axios');

module.exports = {
    getOwnBrandList:function(){
        return axios.get('/IM/getOwnBrandList').then(function(res){
            return res
        })
    },
}
