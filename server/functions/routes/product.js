const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productPrice: req.body.productPrice,
      imageUrl: req.body.imageUrl,
    };
    const responce = await db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({ success: true, data: responce });
  } catch (err) {
    return res.send({ success: false, error: `Error : ${err}` });
  }
});
router.get("/all", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let responce = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          responce.push({ ...doc.data() });
        });
        return responce;
      });
      return res.status(200).send({ success: true, data: responce });
    } catch (err) {
      return res.send({ success: false, error: `Error : ${err}` });
    }
  })();
});
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, error: `Error : ${err}` });
  }
});
// Create a Cart.
router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();
    if (await doc.data()) {
      const quantity = (await doc.data().quantity) + 1;
      const updatedItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItems });
    } else {
      const data = {
        productId: productId,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        productPrice: req.body.productPrice,
        imageUrl: req.body.imageUrl,
        quantity: 1,
      };
      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, error: `Error : ${err}` });
  }
});
// get all cart items for that user
router.get("/getCartItems/:userId", async (req, res) => {
  const userId = req.params.userId;
  (async () => {
    try {
      const query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let responce = [];
      await query.get().then((querySnap) => {
        let docs = querySnap.docs;
        docs.map((doc) => {
          responce.push({ ...doc.data() });
        });
        return responce;
      });
      return res.status(200).send({ success: true, data: responce });
    } catch (err) {
      return res.send({ success: false, error: `Error : ${err}` });
    }
  })();
});
// Update the cart increase and decrease
router.post("/updateCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.query.productId;
  const type = req.query.type;
  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();
      if(doc.data()){
        if(type === "increment"){
const quantity = (await doc.data().quantity) + 1;
      const updatedItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItems });
        }else{
          if(doc.data().quantity === 1){
await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`).delete().then((result) => {
return res.status(200).send({ success: true, data: result });
        })
          }else{
const quantity = (await doc.data().quantity) - 1;
const updatedItems = await db
  .collection("cartItems")
  .doc(`/${userId}/`)
  .collection("items")
  .doc(`/${productId}/`)
  .update({ quantity });
return res.status(200).send({ success: true, data: updatedItems });
          }
        }
      }
  } catch (err) {
    return res.send({success : false, error : `Error : ${err}`})
  }
});
module.exports = router;
