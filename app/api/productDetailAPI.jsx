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
            }
        })

    }
}
