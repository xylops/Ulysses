var axios = require('axios');

module.exports = {
    getNonProcessInvoice:function(){
        return axios.get('/LGSI/getNonProcessInvoice').then(function(res){
            return res
        })
    },
    checkLogisticPerDay:function(date){
        return axios({
            method:'post',
            url:'/LGSI/checkLogisticPerDay',
            params:{
                date
            },
            json:true
        })
    },
    getLicencePlate:function(){
        return axios.get('/LGSI/getLicencePlate').then(function(res){
            return res
        })
    },
    createNewLogistic:function(record){
        return axios({
            method:'post',
            url:'/LGSI/createNewLogistic',
            params:{
                record
            },
            json:true
        })
    },
    //Pick List
    getPickList:function(){
        return axios.get('/LGPL/getPickList').then(function(res){
            return res
        })
    },
    completePickList:function(logisticID, OBI,date){
        return axios({
            method:'post',
            url:'/LGPL/completePickList',
            params:{
                logisticID,
                OBI,
                date
            },
            json:true
        })
    },
}
