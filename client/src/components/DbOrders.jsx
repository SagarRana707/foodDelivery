import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../context/actions/orderActions";
import OrderData from "./ordersData";
const DbOrders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orders) {
      getAllOrders().then((orders) => {
        dispatch(setOrders(orders));
      });
    }
  }, [dispatch, orders]);
  return (
    <div className=" flex items-center justify-center flex-col w-full pt-3 gap-2">
      {orders ? (
        <>{orders.map((item,i) => {
            return <OrderData key={i} index={i} data={item} admin={true}/>
        })}</>
      ) : (
        <>
          <h1 className=" text-headingColor text-6xl font-extrabold">
            NO Orders
          </h1>
        </>
      )}
    </div>
  );
};

export default DbOrders;
