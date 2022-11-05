const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { route, post } = require("./auth");




//CREATE POST
router.post("/", async function(req,res){
    const newPost = new Post(req.body);
    try {
        const savePost =await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST 
router.put("/:id",async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                },
                {new: true}
                );
                res.status(200).json(updatePost);
            } catch (err) {
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("you can update only your post ....")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id",async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.username == req.body.username){
            try {
                await post.delete();
                res.status(200).json("post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("you can delete only your post ....")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST 
router.get("/:id", async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POST 
router.get("/", async function(req,res){
    const username = req.query.user;
    const catName = req.query.catName;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts= await Post.find({categories:{
                $in: [catName]
            }})
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});



module.exports = router;