module.exports = {
    getFullClientData:function(){
        return axios.get('/CM/getFullClientData').then(function(res){
            // console.log(res.data)
            return res
        })
    },
    // createNewClient:function(newProduct){
    //     return axios({
    //         method:'post',
    //         url:'/PD/createNewProduct',
    //         params:{
    //             newProduct
    //         },
    //         json:true
    //     })
    // },
    //
    // deleteClient:function(ID){
    //     return axios({
    //         method:'post',
    //         url:'/PD/deleteProduct',
    //         params:{
    //             ID
    //         },
    //         json:true
    //     })
    // },
    //
    // updateProduct:function(UpdatedProduct){
    //     return axios({
    //         method:'post',
    //         url:'/PD/updateProduct',
    //         params:{
    //             UpdatedProduct
    //         },
    //         json:true
    //     })
    // }
}
