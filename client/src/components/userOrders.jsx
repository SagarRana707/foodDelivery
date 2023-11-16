import React, { useEffect, useState } from 'react'
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../api';
import { setOrders } from '../context/actions/orderActions';
import OrderData from './ordersData';

const UserOrders = () => {
    const orders= useSelector(state => state.orders);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [userOrders, setUserOrders] = useState(null);
    useEffect(() => {
        if(!orders){
            getAllOrders().then(data => {
                dispatch(setOrders(data));
            setUserOrders(
              data.filter((item) => item.userId === user.user_id)
            );
            })
        }else{
            setUserOrders(orders.filter( item => item.userId === user.user_id));
        }
    }, [orders,dispatch,user])
return (
  <div className=" w-screen min-h-fit flex items-center justify-center bg-primary flex-col">
    <Header />
    <div className=" w-full flex flex-col items-start justify-center mt-10 px-5 md:px-20 2xl:px-96 gap-10 pb-24">
      {userOrders?.length > 0 ? (
        <>
          {userOrders.map((item, i) => {
            return <OrderData key={i} index={i} data={item} admin={false} />;
          })}
        </>
      ) : (
        <>
          <h1 className=" text-headingColor text-6xl font-extrabold">
            NO Orders
          </h1>
        </>
      )}
    </div>
  </div>
);
}
export default UserOrders;