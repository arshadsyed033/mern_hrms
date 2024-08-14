const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/hrms_Demo",{useNewUrlParser:true});

const dbconn = mongoose.connection;
dbconn.on("error",console.error.bind(console,"connection error:"));
dbconn.once("open",function(){
    console.log("connected to monagodb success");

});