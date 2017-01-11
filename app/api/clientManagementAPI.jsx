var axios = require('axios');

module.exports = {
    getFullClientData:function(skip){
        return axios({
            method:'post',
            url:'/CM/getFullClientData',
            params:{
                skip
            },
            json:true
        })
    },
    filterClient:function(searchText, type){
        return axios({
            method:'post',
            url:'/CM/filterClient',
            params:{
                searchText, type
            },
            json:true
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
