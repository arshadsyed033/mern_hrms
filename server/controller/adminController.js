const Login = require("../model/adminModel");
const JWT = require("jsonwebtoken");
const md5   =   require("md5");
require('dotenv').config();
const adminCtrl = {
    loginAdmin: async (req, res) => {
        try {
            const { UserName, Password } = req.body;
            console.log(req.body,"reqBody");
            console.log(UserName,"Email1");
            console.log(Password,"Password1");
            if (!UserName && !Password) {
                return res.status(400).json({ msg: "Not all fields have been entered" });
            }
            const hashedPassword = md5(Password);
            console.log("Hashed Password:", hashedPassword);
            const details = await Login.findOne({ "UserName": UserName, "Password": hashedPassword });
            
            console.log("user info admin ", details)
            if (!details) {
                return res.status(400).json({ msg: "No account with this details has been registered" });
            } else {
                const accessToken = JWT.sign({
                    UserName: details.UserName,
                    Role: details.Role,
                    id:details._id
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "1m"
                });
                console.log("hiiii "+ accessToken)
                const refreshToken = JWT.sign({
                    UserName: details.UserName
                }, process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn: "7h"
                })

                res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    sameSite: 'None', secure: false,
                    maxAge: 1 * 60 * 60 * 1000
                });
                console.log("accesstoken is ", accessToken)
                return res.json({ accessToken, refreshToken, details })
            }
            }
            catch (err) {
            return res.status(500).json({ msg: err.message });
         }
        },
        logoutAdmin: async (req, res) => {
            try {
              res.clearCookie('jwt');
              res.send('Logged out successfully');
            } catch (err) {
              return res.status(500).json({ msg: err.message });
            }
          }
        };
module.exports = adminCtrl;
