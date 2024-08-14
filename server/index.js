const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const md5 = require("md5")
const session = require("express-session");
const Login = require('../server/model/adminModel');
const adminRoute = require('../server/route/adminRoute');
const employeeRoute = require('./route/employeeRoute');
require('./config');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.use('/admin', adminRoute);
app.use('/employee', employeeRoute);

app.listen(PORT,async function(){
    console.log("server is running on port 5000");
        try{
            const getAdmin = await Login.find({ UserName:"mongodb",Role:"Admin", Password:md5("123456")})
        if (getAdmin == "") {
            const admin = new Login({ UserName:"admin123",Role:"Admin",Password: md5("123456")})
            admin.save();
            console.log("admin " + admin);
        }
        else {
            console.log("Admin already exists")
        }
        }catch(err){
            console.log(err);
        }
});