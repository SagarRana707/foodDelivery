import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { buttonClick, slideIn, stagerFadeInOut } from "../animations";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../context/actions/displayCartActions";
import { FcClearFilters } from "react-icons/fc";
import { BsCurrencyRupee } from "react-icons/bs";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let lot = 0;
    if(cart){
      cart?.map((data) => {
         lot = lot + data.productPrice * data.quantity;
       return setTotal(lot);
      })
    }
  }, [cart])
  return (
    <motion.div
      {...slideIn}
      className=" fixed z-50 top-0 right-0 w-4/12 md:w-[500px]  bg-cardOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className=" w-full flex items-center justify-between py-3 px-2 pb-12">
        <motion.i
          className=" cursor-pointer"
          {...buttonClick}
          onClick={() => {
            dispatch(setCartOff());
          }}
        >
          <BiChevronRight className=" text-[58px] text-textColor" />
        </motion.i>
        <p className=" text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.i
          className=" cursor-pointer"
          {...buttonClick}
          onClick={() => {}}
        >
          <FcClearFilters className=" text-[50px] text-textColor" />
        </motion.i>
      </div>
      <div className=" flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-3 px-2 relative">
        {cart && cart.length > 0 ? (
          <>
            <div className=" flex flex-col w-full justify-start items-start gap-2 h-[65%] overflow-y-scroll scrollbar-none">
              {cart &&
                cart.length > 0 &&
                cart.map((item, i) => {
                  return <CartItemCard index={i} data={item} />;
                })}
            </div>
            <div className=" bg-zinc-800 rounded-t-[60] w-full h-[35%] flex flex-col items-center justify-center px-3 py-2 gap-4">
              <div className=" w-full flex items-center justify-evently gap-1">
                <p className=" text-2xl text-zinc-500 font-semibold">Total</p>
                <p className=" text-2xl text-orange-500 font-semibold flex items-center justify-center">
                    <BsCurrencyRupee className=" text-primary" />
                  {total}
                </p>
              </div>
            </div>  
          </>
        ) : (
          <>
            <h1 className=" text-3xl font-bold text-primary">Empty Cart</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const [itemTotal, setItemTotal] = useState();
  useEffect(() => {
    setItemTotal(data.productPrice * data.quantity);
  }, [itemTotal, cart, data.productPrice, data.quantity]);
  const decrementCart =(productId) => {};
  const incrementCart =(productId) => {};

  return (
    <motion.div
      key={index}
      {...stagerFadeInOut(index)}
      className=" bg-zinc-800 w-full flex items-center justify-start rounded-md drop-shadow-md px-2 gap-2"
    >
      <div className="">
        <img src={data.imageUrl} alt="" className=" h-28 w-28" />
      </div>
      <div className=" items-center justify-start flex gap-1 w-full">
        <p className=" text-primary text-lg font-semibold">
          {data?.productName}
          <span className=" text-sm block capitalize text-gray-400">
            {data?.productCategory}
          </span>
        </p>
        <p className=" text-sm font-semibold text-red-400 ml-auto flex justify-center items-center">
          <BsCurrencyRupee className=" text-red-400 font-semibold" />{" "}
          {itemTotal}
        </p>
      </div>
      <div className=" ml-auto flex justify-center items-center gap-2">
        <motion.div
          onClick={() => {
            incrementCart(data?.productId);
          }}
          {...buttonClick}
          className="w-6 h-6 rounded-md flex justify-center items-center drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className=" text-xl font-semibold text-primary">+</p>
        </motion.div>
        <p className=" text-lg font-semibold text-primary">{data?.quantity}</p>
        <motion.div
          onClick={() => {
            decrementCart(data?.productId);
          }}
          {...buttonClick}
          className="w-6 h-6 rounded-md flex justify-center items-center drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className=" text-xl font-semibold text-primary">-</p>
        </motion.div>
      </div>
     
    </motion.div>
  );
};

export default Cart;
