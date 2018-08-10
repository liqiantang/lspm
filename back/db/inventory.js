/**
 * 货品信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var InventorySchema = new Schema({
    brand : { type: String },                    //品牌
    category: {type: String},                        //类别
    model: {type: String},                     //型号
    num:{type:Number},//数量
    warehouse:{type: String},
    addDate : { type: Date}                       //添加实时间
});

module.exports = mongoose.model('inventory',InventorySchema);