var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bbs002");

//ちょっと面倒くさい。簡易な書き方ないかな。
var PostSchema = new mongoose.Schema({
    name: String,
    text: String
});
var Post = mongoose.model("Post", PostSchema);


router.route("/:_id")
    .get(function(req,res){
        res.json({
            message: req.param("_id")
        });
        //Post.findById(req.param("_id"))
    });


//どのようにテストしていくか…
//個別記事の取得もできるようにしたい。
router.route("/")
    .get(function(req,res){
        Post.find(function(err, posts){
            if(err){
                //throwじゃなくていいのかな
                res.send(err);
            }

            res.json({
                message: "success",
                "posts":posts
            });
        });
    })
    .post(function(req,res){
        //mochaでテスト書きたい
        var item = new Post();
        item.name = req.param("name");
        item.text = req.param("text");
        item.save(function(err){
            if(err){
                //throwじゃなくていいのかな
                res.send(err);
            }

            res.json({
                message: "success",
                posted: item
            });
        });
    });
    //updateの空白更新と、更新しないパターンをどう表現するか？
    //undefinedなら更新せず、空白なら更新する。

module.exports = router;