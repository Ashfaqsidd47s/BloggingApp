const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async function(req,res){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//Login
router.post("/login", async function(req,res){
    try {
        const user =await User.findOne({email: req.body.email});
        !user && res.status(400).json("wrong credentials!..");
            
        const validate =await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json("you have enterd wrong password ....");
         
        const {password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;