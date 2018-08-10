var Users = require("./../db/user.js");
var Mongodb = require("./../db/mongodb");
/**
 * 插入
 */

const mongodb = new Mongodb();

function addUser(){
    let data = {
         userName :"admin",
         password : "tpdldq"
    };
    var user = new Users(data);
    user.save(function (err, res1) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res1);
        }
    });
}