var axios = require('axios');

module.exports = {
    getFullProductData:function(){
        return axios.get('/getFullProductData').then(function(res){
            // console.log(res.data)
            return (res)
        })
    },
    postData:function(title, genre){
        return axios({
            method:'post',
            url:'/insert',
            params:{
                title,
                genre
            }
        })

    }
}
