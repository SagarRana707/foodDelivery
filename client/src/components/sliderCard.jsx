import { motion } from "framer-motion";
import React from "react";
import { BiRupee } from "react-icons/bi";
import { IoBasket } from "react-icons/io5";
const SliderCard = ({ data, index }) => {
  return (
    <div key={index} className=" bg-gray-50 hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-3 py-2  gap-2 h-36 w-46">
      <div>  <img alt="" src={data.imageUrl} className=" w-20 h-20 object-cover"/></div>
      <div>
<p className=" text-xl text-headingColor font-semibold">{data.productName}</p>
<p className=" flex justify-center items-center text-red-600"><BiRupee/><span className=" text-red-600 font-semibold">{data.productPrice}</span></p>
</div>
<motion.div className=" rounded-full w-4 h-4 bg-red-600 flex justify-center items-center absolute top-0 right-2 cursor-pointer">
<IoBasket className=" text-2xl text-primary"/>
</motion.div>
    </div>
  );
};

export default SliderCard;
