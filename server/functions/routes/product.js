const   router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ignoreUndefinedProperties : true});
router.post("/create" , async (req,res) => {
    try{
const id = Date.now();
const data = {
    productId : id,
  productName: req.body.productName,
  productCategory: req.body.productCategory,
  productPrice: req.body.productPrice,
  imageUrl: req.body.imageUrl,
};
const responce = await db.collection("products").doc(`/${id}/`).set(data);
return res.status(200).send({ success: true, data: responce });
    }
    catch(err){
return res.send({ success : false, error : `Error : ${err}`})
    }
})
router.get("/all", async (req,res) => {
(async () => {
  try {
    let query = db.collection("products");
    let responce = [];
    await query.get().then((querysnap) => {
      let docs = querysnap.docs;
      docs.map( doc => {
        responce.push({...doc.data()});
      });
      return responce;
    });
return res.status(200).send({ success: true, data: responce });
  } catch (err) {
    return res.send({ success: false, error: `Error : ${err}` });
  }
})();
})
module.exports = router;