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
    if (doc.data()) {
      if (type === "increment") {
        const quantity = (await doc.data().quantity) + 1;
        const updatedItems = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItems });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
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
    return res.send({ success: false, error: `Error : ${err}` });
  }
});
router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.data.user.user_id,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,
    },
  });
  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productName,
          images: [item.imageUrl],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.productPrice * 100,
      },
      quantity: item.quantity,
    };
  });
  //this call the webhook.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `http://localhost:3000/checkOutSuccess`,
    cancel_url: `http://localhost:3000`,
  });

  res.send({ url: session.url });
});
let endpointSecret;
//  endpointSecret = "whsec_1ba1ab69f0d0cd3615c4c7f945c39fd4beeaa47e09fedf96de4c8906fad67643";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    console.log("Webhook received!");
    const sig = request.headers["stripe-signature"];
    let eventType;
    let data;
    if (endpointSecret) {
      let event;
      try {
        event = await stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err);
        return;
      }
      data = await event.data.object;
      eventType = await event.type;
    } else {
      try {
        data = request.body.data.object;
        eventType = request.body.type;
      } catch (err) {
        console.log(" ERROR in webhook :", err);
      }
    }

    // Log received data and event type
    // Handle the event
    if (eventType === "checkout.session.completed") {
      await stripe.customers.retrieve(data.customer).then(async (customer) => {
        // console.log("Customer details :", customer);
        // console.log("Data :", data);
        await createOrder(customer, data, response);
      });
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

const createOrder = async (customer, intend, res) => {
  console.log("inside the orders");
  try {
    const orderId = Date.now();
    const data = {
      intendId: intend.id,
      orderId: orderId,
      amount: intend.amount_total,
      created: intend.created,
      payment_method_types: intend.payment_method_types,
      status: intend.payment_status,
      customer: intend.customer_details,
      shippingDetails: intend.shipping_details,
      userId: customer.metadata.userId,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };
    await db.collection("orders").doc(`/${orderId}/`).set(data);
    await deleteCart(
      customer.metadata.userId,
      JSON.parse(customer.metadata.cart)
    );
    console.log("************************");
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};
const deleteCart = async (userId, items) => {
  console.log("UserId in delete cart : ", userId);
  console.log("************************");
  items.map(async (data) => {
    console.log("---------inside---------", userId, data.productId);
    return await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${data.productId}/`)
      .delete().then(() => {console.log("-----------success----------");});
  });
};
// Orders
router.get("/orders", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("orders");
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
// Update orders 
router.post("/updateOrder/:orderId",async (req,res) => {
const orderId = req.params.orderId;
const sts = req.query.sts;
try{
  const updatedItems= await db.collection("orders").doc(`/${orderId}/`).update({sts});
  return res.status(200).send({success : true,data : updatedItems});
}catch(err){
  return res.send({success : false, msg : err});
}
})
module.exports = router;
{codedrill - sagar.codedrill@gmail.com
            Code@sr06

gmail - ranarana1

github - sagarrana23707@gmail.com
       - Ranarana1#@
postMan - sagarrana23707@gmail.com
       - ranarana1
heruku - sagarrana23707@gmail.com
       - Code@sr06
linkIn - sagarrana23707@gmail.com
        - ranarana1

amazon - sagarrana23707@Gmail.com
       -  ranarana1

chatgpt - sagarrana23707@gmail.com
        - ranarana1

supabase - password for database 
          -Code@sr06statusBoard

pgb - Stab9860Code06@  rnsaction Codesr06@#SR login

instagram - royalrajputZX12#.@

facebook -- Code@sr06.#

discord -- sagarrana23707@gmail.com
            Codesr06#.

mySql -- @Sr06rana1

PostgreSQL - @Sr06rana1

typing club -- typingClub1@

UAN - 102039058266
PF - Codesr06# Members account -- Drillsr06#

ProtonMail - garry_242@protonmail.com ranarana1#
recovery pharase proton mail -sound knee fit logic rhythm tuna onion cinnamon fatal adjust exile neutral.
Instagram2 - rana1.918 77106athlete1.}
