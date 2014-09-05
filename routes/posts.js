/**
 * Created by yuiwai on 2014/09/05.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.route("/")
    .get(function(req,res){
        res.json({message:"get"});
    })
    .post(function(req,res){
        console.log(req.param("name"));
        console.log(req.param("comment"));
        res.json({message:"post"});

    })
    .put(function(req,res){
        res.json({message:"put"});

    })
    .delete(function(req,res){
        res.json({message:"delete"});

    })


module.exports = router;
