const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const categoriesRoute = require("./routes/categories")
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL,function(){
    console.log("mongodb server connected")
});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded successfully ....");
})

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);


app.get("/",function(req,res){
    res.json("server successfully started ....");
});


app.listen(8080,function(){
    console.log("server started at port 8080....")
});