var axios = require('axios');

module.exports = {
    findClient:function(searchFilter){
        return axios({
            method:'post',
            url:'/IV/findClient',
            data:{
                searchFilter
            },
            json:true
        })
    },
}
