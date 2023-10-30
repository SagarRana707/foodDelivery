import React, { useState } from "react";
import { LoginBg, logo } from "../assets/index";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons/index";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className=" w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBg}
        alt="background Login"
        className=" w-full h-full object-cover absolute top-0 left-0"
      />
      <div className=" flex flex-col items-center bg-cardOverlay w-[40%] md:w-508 p-4 px-4 py-12  h-full z-10 backdrop-blur-sm gap-6">
        <div className=" flex item-center justify-start gap-4 w-full flex-row">
          <img
            src={logo}
            alt="Logo Food delivery"
            height={"25px"}
            width={"30px"}
          />
          <p className=" text-headingColor font-semibold text-2xl ">City</p>
        </div>
        <p className=" text-3xl font-semibold text-headingColor">
          {" "}
          Welcome Back
        </p>
        <p className=" text-xl text-headingColor -mt-6">
          {isSignUp ? "Sign-up" : "Sign-in"} with follwing
        </p>
        <div className=" flex flex-col items-center w-full justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope />}
            inputState={userEmail}
            inputStateFunction={setUserEmail}
            type={"email"}
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder={"Password Here"}
            icon={<FaLock />}
            inputState={password}
            inputStateFunction={setPassword}
            type={"password"}
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password Here"}
              icon={<FaEnvelope />}
              inputState={confirmPassword}
              inputStateFunction={setConfirmPassword}
              type={"password"}
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p>
              Doesn't have an account :{" "}
              <motion.button
                {...buttonClick}
                className=" text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => {
                  setIsSignUp(true);
                }}
              >
                Create One
              </motion.button>{" "}
            </p>
          ) : (
            <p>
              Already have an account :{" "}
              <motion.button
                {...buttonClick}
                className=" text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                Sign-in here
              </motion.button>{" "}
            </p>
          )}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className=" w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white
           text-xl capitalize hover:bg-red-500 translate-all duration-150"
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className=" w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white
           text-xl capitalize hover:bg-red-500 translate-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>
        <div className=" flex justify-center items-center gap-16">
          <div className=" w-24 h-[1px] rounded-md bg-white"></div>
          <p className=" text-white">or</p>
          <div className=" w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        <motion.div
          {...buttonClick}
          className=" flex justify-center items-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer
           rounded-3xl gap-4"
        ><FcGoogle className="text-3xl"/><p className=" capitalize text-base text-headingColor">Sign In with google</p></motion.div>
      </div>
    </div>
  );
};
export default Login;
