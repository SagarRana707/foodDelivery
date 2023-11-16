import { motion } from "framer-motion";
import React from "react";
import { buttonClick, stagerFadeInOut } from "../animations";
import { BiRupee } from "react-icons/bi";
import { getAllOrders, updateOrderSts } from "../api";
import { useDispatch } from "react-redux";
import { setOrders } from "../context/actions/orderActions";
const OrderData = ({ index, data, admin }) => {
    const dispatch = useDispatch();
  const handelClick = (orderId, sts) => {
    updateOrderSts(orderId,sts).then(res => {
        getAllOrders().then(data => {
            dispatch(setOrders(data));
        })
    });
  };
  return (
    <motion.div
      key={index}
      {...stagerFadeInOut(index)}
      className=" w-full flex flex-col px-3 py-2 relative border-gray-300 border-solid
         border bg-cardOverlay drop-shadow-md rounded-md gap-2"
    >
      <div className=" w-full justify-between items-center flex">
        <h1 className=" text-xl text-headingColor font-semibold">Order</h1>
        <div className=" flex items-center gap-3">
          <p className=" flex items-center gap-1 text-textColor">
            Total : <BiRupee className=" text-red-500 text-lg" />
            <span className=" text-headingColor font-bold">{data?.total}</span>
          </p>
          <p
            className=" px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md
         drop-shadow-md bg-emerald-400"
          >
            {data?.status}
          </p>
          <p
            className={` text-base font-semibold capitalize border-solid border border-gray-300 px-2 py-[2px] rounded-md
           ${
             (data?.sts === "preparing" && "text-orange-500 bg-orange-100") ||
             (data?.sts === "cancelled" && "text-red-500 bg-red-100") ||
             (data?.sts === "delivered" && "text-emerald-500 bg-emerald-100")
           }`}
          >
            {data?.sts}
          </p>
          {admin && (
            <div className=" flex justify-center items-center gap-2">
              <p className=" text-lg font-semibold text-headingColor">
                Mark as
              </p>
              <motion.p
                onClick={() => {
                  handelClick(data?.orderId, "preparing");
                }}
                {...buttonClick}
                className=" text-orange-500 text-base font-semibold capitalize border border-solid border-gray-300 rounded-md
                 px-2 py-[2px] cursor-pointer"
              >
                Preparing
              </motion.p>
              <motion.p
                onClick={() => {
                  handelClick(data?.orderId, "cancelled");
                }}
                {...buttonClick}
                className=" text-red-500 text-base font-semibold capitalize border border-solid border-gray-300 rounded-md
                 px-2 py-[2px] cursor-pointer"
              >
                Cancelled
              </motion.p>
              <motion.p
                onClick={() => {
                  handelClick(data?.orderId, "delivered");
                }}
                {...buttonClick}
                className=" text-emerald-500 text-base font-semibold capitalize border border-solid border-gray-300 rounded-md
                 px-2 py-[2px] cursor-pointer"
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-start items-center flex-wrap w-full">
        <div
          className=" flex items-center justify-center
       gap-2"
        >
          {data?.items &&
            data.items.map((item, j) => {
              return (
                <motion.div {...stagerFadeInOut(j)} key={j} className=" flex">
                  <div>
                    <img
                      alt=""
                      src={item.imageUrl}
                      className=" h-10 w-10 object-contain"
                    />
                  </div>
                  <div className=" flex items-start flex-col">
                    <p className=" text-base font-semibold text-headingColor">
                      {item.productName}
                    </p>
                    <div className=" flex items-start gap-2">
                      <p className="text-sm text-textColor">
                        Qty : {item.quantity}
                      </p>
                      <p className=" items-center flex gap-1 text-textColor">
                        {" "}
                        <BiRupee className=" text-base text-red-500" />
                        {parseFloat(item.productPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
        <div className=" flex items-start justify-start flex-col gap-2 px-4 ml-auto w-full md:w-460">
          <h1 className=" text-lg text-headingColor font-semibold">
            {data.shippingDetails?.name}
          </h1>
          <p className=" text-base text-headingColor -mt-2">{data.customer.email} {data.customer.phone}</p>
          <p className=" text-base text-headingColor -mt-2 ">
            {data.shippingDetails.address.line1},
            {data.shippingDetails.address.line2} {" "}
            {data.shippingDetails.address.country} ,
            {data.shippingDetails.address.state} -
            {data.shippingDetails.address.postal_code} 
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderData;
