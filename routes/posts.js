/**
 * Created by yuiwai on 2014/09/05.
 */
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
var PostSchema = new Schema({
    name : String,
    comment : String
});
var Post = mongoose.model("Post", PostSchema);

/* GET home page. */
router.route("/")
    .get(function(req,res){
        Post.find(function(err, posts){
            if(err){
                res.send(err);
            }
            res.json({
                message: "get",
                items: posts
            });
        });
    })
    .post(function(req,res){
        var item = new Post();
        item.name = req.param("name");
        item.comment = req.param("comment");
        item.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:"post"});
        });

    });



module.exports = router;
