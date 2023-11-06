import axios from "axios";
export const baseURL = "http://127.0.0.1:5001/food-delivery-6707/us-central1/app";

export const validateUsersJwtToken = async (token) => {
    try{
const res = await axios.get(`${baseURL}/api/users/jwtVerification`,{
    headers : {Authorization : token}
})
return res.data.data;
    }catch(err){
        console.error(err);
    }
};
//add New product 
export const addNewProduct = async (data) => { 
try{
    const res = await axios.post(`${baseURL}/api/products/create`,{...data});
    console.log(res.data.data);
  return await res.data.data;
}
catch(err){
console.log("Error : ",err);
return null;
}
;
};
//get ALL product 
export const getAllProduct = async (data) => { 
try{
    const res = await axios.get(`${baseURL}/api/products/all`);
    console.log(res.data.data);
  return await res.data.data;
}
catch(err){
console.log("Error : ",err);
return null;
}
}
