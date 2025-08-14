// index.js - entry file for backend

const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://dheeraj321:patna757@cluster0.uvafpxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// API Creation

app.get("/", (req, res)=> {
    res.send("Express app is running");
})

// Image Storage Engine

const storage_ = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage_});

// Creating upload endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})



app.listen(port, (error) => {
    if(!error) {
        console.log("Server Running on port " + port);
    }
    else {
        console.log("Error : " + error);
    }
});
