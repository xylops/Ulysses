var axios = require('axios');

module.exports = {
    getData:function(){
        return axios.get('/get').then(function(res){
            console.log(res.data)
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
