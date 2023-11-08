import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { stagerFadeInOut } from "../animations";
import {IoFastFood} from "react-icons/io5";
import { statuses } from "../utils/styles";
const FilterSection = () => {
  const [category, setCategory] = useState();
  const products = useSelector((state) => state.products);
  return (
    <div>
      <motion.div className=" w-full flex items-center justify-center flex-col px-3 py-3">
        <div className=" w-full flex justify-between items-center">
          <div className=" flex flex-col justify-start items-start gap-1 ">
            <p className=" text-2xl text-headingColor font-bold">
              Our Hot Dishes
            </p>
            <div className=" w-3/5 bg-orange-500 rounded-md h-1"></div>
          </div>
        </div>
      </motion.div>
      <div className=" w-full overflow-x-scroll pt-6 flex justify-center items-center gap-4 py-6">
        {statuses && statuses?.map((data,i) => {
          return (<FilterCard
          data = {data}
          category={category}
          setCategory={setCategory}
          index={i}
          />)
        })}
      </div>
    </div>
  );
};
export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      onClick={() => {setCategory(data.category)}}
      {...stagerFadeInOut(index)}
      className={` group w-28 min-w-[128px] cursor-pointer rounded-md py-4 ${
        category === data.category ? "bg-red-600" : "bg-primary"
      } hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-2`}
    >
      <div
        className={` w-10 h-10 rounded-full shadow-md flex justify-center items-center group-hover:bg-primary ${
          category === data.category ? "bg-primary" : "bg-red-600"
        }`}
      >
        <IoFastFood className={` group-hover:bg-red-600 text-white rounded-full${ category === data.category ? " bg-red-600" : "bg-red-600"}`}/>
      </div>
      <p
        className={` text-xl font-semibold${
          category === data.category ? "bg-primary" : "bg-red-600"
        }`}
      >{data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
