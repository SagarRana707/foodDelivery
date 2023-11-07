const router = require("express").Router();
const admin = require("firebase-admin");
let data =[];
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

    const listAllUsers = (nextPageToken) => {
        // List batch of users, 1000 at a time.
        admin.auth()
          .listUsers(1000, nextPageToken)
          .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
              data.push(userRecord.toJSON());
            });
            if (listUsersResult.pageToken) {
              // List next batch of users.
              listAllUsers(listUsersResult.pageToken);
            }
          })
          .catch((error) => {
            console.log('Error listing users:', error);
          });
      };
      // Start listing users from the beginning, 1000 at a time.
      // listAllUsers();
      
      router.get("/all", async (req, res) => {
        console.log("It works user get function");
        try {
          const users = await listAllUsers();
          return res.status(200).send({ status: true, data: data });
        } catch (err) {
          console.log('Error listing users:', err);
          return res.send({ success: false, msg: `Error in listing users ${err.message}` });
        }
      });

module.exports = router;