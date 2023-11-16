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

 const listAllUsers = async (nextPageToken) => {
   // List batch of users, 1000 at a time.
   const data = [];

   try {
     const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

     listUsersResult.users.forEach((userRecord) => {
       data.push(userRecord.toJSON());
     });

     if (listUsersResult.pageToken) {
       // List next batch of users.
       const nextData = await listAllUsers(listUsersResult.pageToken);
       data.push(...nextData);
     }
   } catch (error) {
     console.log("Error listing users:", error);
     throw error; // Re-throw the error to be caught by the calling function
   }

   return data;
 };

 router.get("/all", async (req, res) => {
   console.log("It works user get function");
   try {
     const users = await listAllUsers();
     return res.status(200).send({ status: true, data: users });
   } catch (err) {
     console.log("Error listing users:", err);
     return res.send({
       success: false,
       msg: `Error in listing users ${err.message}`,
     });
   }
 });

module.exports = router;