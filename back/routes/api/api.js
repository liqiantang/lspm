var express = require('express');
var router = express.Router();
var MongoDb = require("./../../db/mongodb");
const mongodb = new MongoDb();

router.post('/login', function(req, res) {

    let wherestr = req.body;

    mongodb.loginfind(wherestr,function (r) {
        if(r.length!=0){

            return  res.json({ err_code: 1, message: "登陆成功", affextedRows: 1 });
        }else{

            return  res.json({ err_code: 1, message: "用户名或密码错误", affextedRows: 0 });
        }


    })
});


router.post('/add', function(req, res) {
    var wherestr = {
        warehouse:req.body.warehouse,
        brand : req.body.brand,                    //品牌
        category: req.body.category,                         //类别
        model: req.body.model,                   //型号
    };
    var data = {
        warehouse:req.body.warehouse,
        brand : req.body.brand,                    //品牌
        category: req.body.category,                         //类别
        model: req.body.model,                   //型号
        num:req.body.num,
        addDate : new Date()     //最近登录时间
    }

    mongodb.find(wherestr,function (rel) {
        if(rel.length!=0){
            let num = Number(rel[0].num)+Number(req.body.num);
            console.log(num);
            console.log("查到数据");
            /**
             * 更新
             */
            mongodb.update(wherestr,{'num':num},function (r) {
                var obj = "成功";
                console.log(r);
                return  res.json({ err_code: 1, message: r, affextedRows: 0 });
                res.json({ err_code: 200, message: results, affextedRows: results.affextedRows });
            });
            mongodb.addRecord(data);


        }else{
            console.log("未查到数据");
            /**
             * 插入
             */
            mongodb.add(data,function (r) {
                var obj = "成功";
                console.log(r);
                return  res.json({ err_code: 1, message: r, affextedRows: 0 });
                res.json({ err_code: 200, message: results, affextedRows: results.affextedRows });
            });
            mongodb.addRecord(data);
        }
    });
});

router.post('/edit', function(req, res) {
    var wherestr = {
        warehouse:req.body.warehouse,
        brand : req.body.brand,                    //品牌
        category: req.body.category,                         //类别
        model: req.body.model,                   //型号
    };
    var num = req.body.num - req.body.outNum;
    // if(num==0){
    //     mongodb.delete(wherestr,function (r) {
    //         return  res.json({ err_code: 1, message: r, affextedRows: 0 });
    //     })
    // }else{

        mongodb.update(wherestr,{'num':num},function (r) {
            return  res.json({ err_code: 1, message: r, affextedRows: 0 });
        });
    var data = {
        warehouse:req.body.warehouse,
        brand : req.body.brand,                    //品牌
        category: req.body.category,                         //类别
        model: req.body.model,//型号
        num:req.body.outNum,
        addDate : new Date()
    };

    mongodb.outRecord(data);


    // }
});



router.get('/', function(req, res) {

    res.send('respond with a resource');

});

router.post('/find', function(req, res) {

    //let wherestr = req.query;
    let wherestr = {};
    if(JSON.stringify(req.body) != "{}"){
        wherestr = req.body;
    }
    if(req.body.findInfo){
        let findInfo = req.body.findInfo
        var _filter={
            $or: [  // 多字段同时匹配
                {brand: {$regex: findInfo}},
                {category: {$regex: findInfo}}, //  $options: '$i' 忽略大小写
                {model: {$regex: findInfo, $options: '$i'}}
            ]
        };
        wherestr = _filter;
    }
    mongodb.find(wherestr,function (r) {
        return  res.json({ err_code: 1, message: r, affextedRows: 0 });
    })
});


router.post('/findRecord', function(req, res) {

    //let wherestr = req.query;
    let wherestr = {};
    if(JSON.stringify(req.body) != "{}"){
        wherestr = req.body;
    }
    mongodb.findRecord(wherestr,function (r) {
        return  res.json({ err_code: 1, message: r, affextedRows: 0 });
    })
});


module.exports = router;