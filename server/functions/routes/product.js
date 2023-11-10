const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
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
router.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({
    metadata : {
      userId : req.body.data.user.user_id,
      cart :JSON.stringify(req.body.data.cart),
      total :req.body.data.total
    }
  });
  const line_items = req.body.data.cart.map(item => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.productName,
          images: [item.imageUrl],
          metadata: {
            id: item.productId
          },
        },
        unit_amount: item.productPrice * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    shipping_options: [{
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 0, currency: "inr" },
        display_name: "Free shipping",
        delivery_estimate: {
          minimum: { unit: "hour", value: 2 },
          maximum: { unit: "hour", value: 4 },
        }
      }
    }],
    phone_number_collection: { enabled: true },
    line_items,
    customer: customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkOutSuccess`,
    cancel_url: 'https://example.com/cancel',
  });

  res.send({ url: session.url });
});
//stripe 
let endpointSecret;
 endpointSecret = "whsec_1ba1ab69f0d0cd3615c4c7f945c39fd4beeaa47e09fedf96de4c8906fad67643";

router.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {
  console.log('Webhook received!');
  const sig = request.headers['stripe-signature'];
let eventType;
let data;
  if(endpointSecret){
  let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
eventType = event.type;
  }else{
data = request.body.data.object;
eventType = request.body.type;
  }

// Log received data and event type
console.log('Received webhook:', eventType, data);
  // Handle the event
 if(eventType === "checkout.session.completed"){
  await stripe.customers.retrieve(data.customer).then((customer) => {
console.log("Customer details",customer);
console.log("Data",data);
  })
 }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
module.exports = router;
