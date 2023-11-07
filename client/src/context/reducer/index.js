import {combineReducers} from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducer";

const myReducer = combineReducers({
user : userReducer,
alert : alertReducer,
products : productReducer,
allUsers : allUserReducer,
});
export default myReducer;