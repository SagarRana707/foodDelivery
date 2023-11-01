import {combineReducers} from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";

const myReducer = combineReducers({
user : userReducer,
alert : alertReducer
});
export default myReducer;