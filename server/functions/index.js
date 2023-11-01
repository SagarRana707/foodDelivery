const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("./serviceAccountKey.json");
const cors = require("cors");
const express = require("express");
const app = express();
const userRoute = require("./routes/users");
app.use(express.json());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.get("/", (req, res) => {
  res.send("Hello Brother");
  console.log("/ route");
});
app.use("/api/users", userRoute);
exports.app = functions.https.onRequest(app);
