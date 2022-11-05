const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { post } = require("./auth");



//UPDATE
router.put("/:id", async function(req,res){
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateUser =await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true});
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }else{
        res.status(401).json("you can update only your own account...");
    }
});

//DELETE
router.delete("/:id", async function(req,res){
    if(req.body.userId === req.params.id) {
        try {
            const user =await User.findById(req.params.id);

            try {
                await Post.deleteMany({username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted successfully ....")
            } catch (err) {
                res.status(500).json(err);
                console.log(err);
            }
        } catch (err) {
            res.status(404).json("user not found ....");
        }
    }else{
        res.status(401).json("you can delete only your own account...");
    }
});

//getUser
router.get("/:id", async function(req,res){
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others } =  user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;