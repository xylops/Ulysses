var axios = require('axios');


module.exports = {
    getInventoryLevel:function(){
        return axios.get('/IM/allProductLevel').then(function(res){
            return res
        })
    },
    getOwnBrandList:function(){
        return axios.get('/IM/getOwnBrandList').then(function(res){
            return res;
        })
    },

    createInstockList:function(list, date){
        return axios({
            method:'post',
            url:'/IM/createInstockList',
            params:{
                list,
                date
            },
            json:true
        })
    },

}
