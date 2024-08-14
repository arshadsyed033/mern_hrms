const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema(
    {
        UserName  : String,
        Role      : String,
        Password  : String,
        created   : {type:Date, default: Date.now}
    }
);
const Login = mongoose.model("LoginSchema", loginSchema);
module.exports = Login;