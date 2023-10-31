import axios from "axios";
export const baseURL = "http://127.0.0.1:5001/food-delivery-6707/us-central1/app";

export const validateUsersJwtToken = async (token) => {
    console.log(token);
    try{
const res = await axios.get(`${baseURL}/api/users/jwtVerification`,{
    headers : {Authorization : token}
})
return res.data.data;
    }catch(err){
        console.error(err);
    }
};