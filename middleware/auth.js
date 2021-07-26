/* Checks for the JWT token in the headers */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).send({
            success : false,
            error : "Not authorized to access this route"
        })
    }
    else{
        try{
            const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
            /* decoded - will have { id: '60ec551462ab12163cf2bc20', iat: 1626142215, exp: 1626143115 } */
            const user = await User.findById(decoded.id)
            if(!user){
                res.status(404).send({
                    success : false,
                    error : "No user found"
                })
            }
            req.user = user;
            next();
        }catch(err){
            return res.status(401).send({
                success : false,
                error : "Not authorized for this route"
            })
        }
    }
}