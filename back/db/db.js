
const mongoose = require('mongoose');

let mongoUrl = "mongodb://(ip或域名):（端口号）/（数据库）";
mongoose.connect(mongoUrl, {useNewUrlParser:true}, function(err){

    if(err){

        console.log('Connection Error:' + err)

    }else{

        console.log('Connection success!')
    }

});

module.exports = mongoose;
