const router = require("express").Router();
const admin = require("firebase-admin");
router.get("/",(req,res) => {
return res.send("this is user route");
});
router.get("/jwtVerification",async (req,res) => {
    if(!req.headers.authorization){
        return res.status(500).send({msg :"Token Not Found"});
    }
    const token = req.headers.authorization;
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
if(!decodedToken){
    res.status(500).json({status : false,msg : "Unothorized token"});
}
        res.status(200).send({status : true,data : decodedToken});
    }catch(err){
        console.error(err);
        res.send({status : false , msg : `Error in extracting token : ${err}`});
    }
    });

module.exports = router;