import React, { useState } from "react";
import {motion} from "framer-motion";
import { fadeInOut } from "../animations";
const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunction,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div 
    {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-card px-4 py-2  w-full backdrop-blur-sm rounded-md ${
        isFocus ? "shadow-sm shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}{" "}
      <input
        placeholder={placeHolder}
        type={type}
        className=" w-full bg-transparent text-headingColor text-lg font-semibold
 border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunction(e.target.value)}
        onFocus={() => {setIsFocus(true)}}
        onBlur={() => {setIsFocus(false)}}
      />
    </motion.div>
  );
};
export default LoginInput;
