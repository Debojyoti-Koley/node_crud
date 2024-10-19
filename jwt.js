const jwt = require('jsonwebtoken')
const jwtAuthMiddleware = (req,res,next)=>{
    //check if token is present
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"Token not found"})
    //extract the jwt token from request header
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error:"token unauthorized"})
    
    try{
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        //attach the user information to request object
        req.user = decoded
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({error: "error unauthorized"})
    }
}
const generateToken = (userData)=>{
    //generate a new jwt token using userdata and secret key
    return jwt.sign(userData,process.env.JWT_KEY, {expiresIn:3000})
}
module.exports = {jwtAuthMiddleware,generateToken}