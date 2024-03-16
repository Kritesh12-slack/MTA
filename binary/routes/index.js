var express = require('express');
var router = express.Router();

const userModel = require("./users")

/* GET home page. */

router.get("/create",async function(req,res){
  const response = await userModel.create({
    username : "Kritesh",
    age : 21,
    name : "Kritesh Shrivastava"
  })
  res.send("User Created",response)
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
