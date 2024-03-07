const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const app = express();

const userDbprocess = require("./dbprocess/dbprocess")
const port = 8083
app.listen(port,  ()=>{
    console.log("Server Started, port", port)
})
 
// connecting with the mongodb
try {
    mongoose.connect('mongodb://localhost:27017/nodejsProject');
    console.log("mongodb is connected successfully") 
} catch (error) {
    console.log(error);
    console.log("mongodb is not connected, please check")
}
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) 
app.use("/userDetails", userDbprocess);



