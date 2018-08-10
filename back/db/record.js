/**
 * 货品记录
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var RecordSchema = new Schema({
    brand : { type: String },                    //品牌
    category: {type: String},                        //类别
    model: {type: String},                     //型号
    num:{type:Number},//数量
    warehouse:{type: String},//仓库
    operation:{type: String},//操作
    addDate : { type: Date}                       //操作时间
});

module.exports = mongoose.model('record',RecordSchema);