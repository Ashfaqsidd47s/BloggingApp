const router = require("express").Router();
const Category = require("../models/Category");

//CREATE CATEGORIES
router.post("/",async function(req,res){
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL CATEGORIES
router.get("/",async function(req,res){
    try {
        const cat = await Category.find();
        res.status(200).json(cat);
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;