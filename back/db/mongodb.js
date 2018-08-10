let Inventory = require("./../db/inventory.js");
let Record = require("./../db/record.js");
let Users = require("./../db/user.js");
class MongoDb{

    loginfind(data,callback){
        Users.find( data,function(err, rel){
            if (err) {
                console.log("Error:" + err);
                if(callback){
                    callback(err);
                };
            }
            else {
                console.log("Res:" + rel);
                if(callback){
                    callback(rel);
                };
            }
        })
    }


    /**
     *
     * @param wherestr 查询条件
     * @param updatestr 更新信息
     */
    update(wherestr,updatestr,callback){

        Inventory.update(wherestr, updatestr, function(err, res){
            if (err) {
                console.log("Error:" + err);
                if(callback)
                {callback(err)};
            }
            else {
                console.log("Resupdate:" + res);
                if(callback){
                    callback(res);
                };
            }
        });



    };

    /**
     *
     * @param wherestr
     * @param callback
     */
    find(wherestr,callback){
        Inventory.find( wherestr,function(err, rel){
            if (err) {
                console.log("Error:" + err);
                if(callback){
                    callback(err);
                };
            }
            else {
                console.log("Res:" + rel);
                if(callback){
                    callback(rel);
                };
            }
        })
    };

    /**
     *
     * @param data
     * @param callback
     */
    add(data,callback){
        var inventory = new Inventory(data);
        inventory.save(function (err, res1) {

            if (err) {
                console.log("Error:" + err);
                if(callback){
                    callback(err);
                };
            }
            else {
                console.log("Res:" + res1);
                if(callback){
                    callback(res1);
                };
            }
        });


    }

    delete(data,callback){
        Inventory.remove(data, function(err, res){
            if (err) {
                console.log("Error:" + err);
                if(callback){
                    callback(err);
                };
            }
            else {
                console.log("Res:" + res);
                if(callback){
                    callback(res);
                };
            }
        })
    };

    /**
     * 添加入库纪录
     * @param data
     */
    addRecord(data){
        data.operation = "入库"+data.num+"台";
        var record = new Record(data);
        record.save(function (err,res1) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log("Res:" + res1);
            }
        })
    }

    /**
     * 添加出库记录
     * @param data
     */
    outRecord(data){
        data.operation = "出库"+data.num+"台";
        var record = new Record(data);
        record.save(function (err,res1) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log("Res:" + res1);
            }
        })
    }

    /**
     * 查询出入库记录
     * @param data
     */
    findRecord(data,callback){
        Record.find( data,function(err, rel){
            if (err) {
                console.log("Error:" + err);
                if(callback){
                    callback(err);
                };
            }
            else {
                console.log(rel.length);

                if(callback){
                    callback(rel);
                };
            }
        }).sort({"addDate":-1})
    }
}
module.exports = MongoDb;
