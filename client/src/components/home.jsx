import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { delivery, heroBg } from "../assets";
import { buttonClick, stagerFadeInOut } from "../animations";
import { randomData } from "../utils/styles";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../api";
import { setAllProducts } from "../context/actions/productActions";
const Home = () => {
  const dispatch = useDispatch();
  const products  = useSelector(state => state?.products);
  useEffect(() => {
      if(!products){
          getAllProduct().then(data => {
              dispatch(setAllProducts(data));
          });
      }
  }, [products,dispatch]);
  return (
    <div className=" w-full flex flex-col items-start justify-center mt-5 px-2 pb-6 gap-4">
      <motion.div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className=" flex flex-col items-start justify-start b gap-2 px-2">
          <div className=" flex items-center justify-center bg-orange-100 rounded-full gap-2 px-2">
            <p className=" text-lg font-semibold text-orange-500 w-fit">
              Free Delivery
            </p>
            <div className=" flex h-[45px] w-[45px] rounded-full bg-primary items-center justify-center">
              <img
                src={delivery}
                alt=""
                className=" w-full h-full object-contain"
              />
            </div>
          </div>
          <p className=" text-[48px] text-headingColor md:text-[72px] font-sans font-extrabold tracking-wider">
            The Fastest Delivery in{" "}
            <span className=" text-orange-600">Your City</span>
          </p>
          <p className=" text-textColor text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            nesciunt quisquam sed aspernatur debitis incidunt repellendus
            eveniet consequuntur ipsam, ea eius atque iste, dolorem animi
            doloremque minima minus provident porro?
          </p>
          <motion.button
            {...buttonClick}
            className=" bg-gradient-to-bl from-orange-400 bg-orange-600 px-3 py-2 rounded-xl text-black text-base font-semibold"
          >
            Order Now
          </motion.button>
        </div>
        <div className=" py-2 flex flex-1 items-center justify-center relative w-full ">
          <img
            src={heroBg}
            alt=""
            className=" absolute top-0 right-0 md:w-auto md:right-12 h-full md:h-full w-full"
          />
          <div className=" w-full md:w-460  flex flex-wrap items-center justify-center gap-2 gap-y-6 ml-1">
            {randomData &&
              randomData.map((data, index) => {
                return (
                  <motion.div
                    key={index}
                    {...stagerFadeInOut(index)}
                    className=" ml-2 w-32 h-36 md:h-auto md:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center
                     drop-shadow-lg"
                  >
                    <img
                      src={data.imageUrl}
                      alt=""
                      className=" w-12 h-12 md:w-10 md:h-10  object-contain"
                    />
                    <p className=" text-sm lg:text-xl font-semibold text-textColor">
                      {data.productName}
                    </p>
                    <p className=" text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                      {data.productCategory}
                    </p>
                    <p className=" text-sm font-semibold text-headingColor flex justify-center items-center">
                      <span className=" text-xs text-red-600">
                        <BiRupee />
                      </span>
                      {data.productPrice}
                    </p>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
