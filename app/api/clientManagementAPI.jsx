var axios = require('axios');

module.exports = {
    getFullClientData:function(){
        return axios.get('/CM/getFullClientData').then(function(res){
            return res
        })
    },
    createNewClient:function(newClient){
        return axios({
            method:'post',
            url:'/CM/createNewClient',
            params:{
                newClient
            },
            json:true
        })
    },

    deleteClient:function(ID){
        return axios({
            method:'post',
            url:'/CM/deleteClient',
            params:{
                ID
            },
            json:true
        })
    },
    updateClient:function(UpdatedClient){
        return axios({
            method:'post',
            url:'/CM/updateClient',
            params:{
                UpdatedClient
            },
            json:true
        })
    }
}
