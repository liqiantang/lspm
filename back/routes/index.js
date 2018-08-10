var express = require('express');
var router = express.Router();
var MongoDb = require("./../db/mongodb");
const mongodb = new MongoDb();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express11111111111' });
});



module.exports = router;
