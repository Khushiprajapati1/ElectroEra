const adminMiddeleware = async (req,res,next) =>{

    try {
       // console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message:"Access Denied, User is not an Admin"})
        }
        //return res.status(200).json({message:req.user.isAdmin})
        next();
    } catch (error) {
        next(error);
    }
    
}

module.exports = adminMiddeleware