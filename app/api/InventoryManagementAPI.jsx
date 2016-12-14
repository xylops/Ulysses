var axios = require('axios');


module.exports = {
    getInventoryLevel:function(){
        return axios.get('/IM/allProductLevel').then(function(res){
            return res
        })
    },
}

module.exports = {
    getOwnBrandList:function(){
        return axios.get('/IM/getOwnBrandList').then(function(res){
            return res;
        })
    },
}
