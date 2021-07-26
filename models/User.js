const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please provide UserName"]
    },
    email : {
        type : String,
        required : [true,"Please provide email"],
        unique : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid Email"
        ]
    },
    password : {
        type : String,
        required : [true,"Please provide Password"],
        minlength : 6
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();
    /* Hash password */
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
/* 
    password - refers to the password in req.body
    this.password - refers to the password of the User in the database 
        - that we get it using findone in controller-auth.js
    matchPasswords - runs aganist the current User schema - so we can access using this.password
*/
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.getToken =  function(){
    return jwt.sign({id:this._id},process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXPIRE})
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * (60*1000);
    return resetToken;
}
const User = mongoose.model("User",userSchema);

module.exports = User;