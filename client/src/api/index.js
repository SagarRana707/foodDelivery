import axios from "axios";
export const baseURL =
  "http://127.0.0.1:5001/food-delivery-6707/us-central1/app";

export const validateUsersJwtToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: token },
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};
//add New product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    console.log(res.data.data);
    return await res.data.data;
  } catch (err) {
    console.log("Error : ", err);
    return null;
  }
};
//get ALL product
export const getAllProduct = async (data) => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    console.log(res.data.data);
    return await res.data.data;
  } catch (err) {
    console.log("Error : ", err);
    return null;
  }
};
//delete a product
export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    console.log(res.data.data);
    return await res.data.data;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};
//get all users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    console.log(res.data.data);
    return await res.data.data;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};
// Add items to cart
export const addNewItemToCart = async (userId, data) => {
  console.log(userId, data);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${userId}`,
      data
    );
    console.log(res.data.data);
    return await res.data.data;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};
// Get all cart Items.
export const getAllCartItems = async (userId) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${userId}`
    );
    return await res.data.data;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};
// CART increment
export const increaseItemQuatity = async (userId, productId, type) => {
  try {
    const res = axios.post(
      `${baseURL}/api/products/updateCart/${userId}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return (await res).data.data;
  } catch (err) {
    return console.error(`Error : ${err}`);
  }
};
// Cart decrement
export const decreaseItemQuatity = async (userId, productId, type) => {
  try {
    const res = axios.post(
      `${baseURL}/api/products/updateCart/${userId}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return (await res).data.data;
  } catch (err) {
    return console.error(`Error : ${err}`);
  }
};