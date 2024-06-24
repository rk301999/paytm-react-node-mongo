import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next)=>{
    // const authHeader = req.cookies.access_token 
    const authHeader = req.headers?.authorization
    console.log(req.headers);
    console.log("authheaderhaiye",authHeader);

    if(!authHeader ){
        return res.status(403).json("you are not authorised")
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    //verify token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({});
    }

}