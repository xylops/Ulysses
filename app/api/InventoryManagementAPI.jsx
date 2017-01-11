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
            url:'/IM/createAndEditInstockList',
            params:{
                list,
                date
            },
            json:true
        })
    },
    getDateInstockList: function(date){
        return axios({
            method:'post',
            url:'/IM/getDateInstockList',
            params:{
                date
            },
            json:true
        })
    },
    deleteInventoryRecord: function(id, date, inventoryID){
        return axios({
            method:'post',
            url:'/IM/deleteInventoryRecord',
            params:{
                id,
                date,
                inventoryID
            },
            json:true
        })
    },
    getInventoryRecord: function(startDate, endDate){
        return axios({
            method:'post',
            url:'/IM/getInventoryRecord',
            params:{
                startDate,
                endDate
            },
            json:true
        })
    }
}
