var axios = require('axios');

module.exports = {
    getFullProductData:function(){
        return axios.get('/PD/getFullProductData').then(function(res){
            // console.log(res.data)
            return res
        })
    },
    createNewProduct:function(newProduct){
        return axios({
            method:'post',
            url:'/PD/createNewProduct',
            params:{
                newProduct
            },
            json:true
        })
    },

    deleteProduct:function(ID){
        return axios({
            method:'post',
            url:'/PD/deleteProduct',
            params:{
                ID
            },
            json:true
        })
    },

    updateProduct:function(UpdatedProduct){
        return axios({
            method:'post',
            url:'/PD/updateProduct',
            params:{
                UpdatedProduct
            },
            json:true
        })
    }
}
