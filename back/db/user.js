/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    userName : { type: String },                    //用户名
    password: {type: String},                        //密码
});

module.exports = mongoose.model('users',UsersSchema);