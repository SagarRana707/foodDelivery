import React from "react";
import Header from "./header";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { buttonClick } from "../animations";
import { FaArrowLeft } from "react-icons/fa";
import { PaymentSuccess } from "../assets";
const CheckOutSuccess = () => {
  return (
    <main className=" w-screen max-h-screen flex flex-col justify-start items-center">
      <Header />
      <div className=" w-full flex flex-col justify-center items-center mt-10 px-3 md:px-10 2xl:px-96 gap-8 pb-24">
        <div>
          <img src={PaymentSuccess} alt="" /> 
        </div>
        <h1 className=" text-[50px] text-headingColor font-bold">
          Amount paid Successfully
        </h1>
        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className={
              " text-textColor font-semibold px-3 py-2 rounded-md border border-gray-300 hover:shadow-md flex flex-col justify-center items-center gap-2 cursor-pointer text-2xl"
            }
          >
            <FaArrowLeft className=" text-3xl text-headingColor" />
            Get Back To Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
