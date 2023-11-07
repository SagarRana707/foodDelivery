import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import {CChart} from "@coreui/react-chartjs"
const DbHome = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const drinks = products?.filter((item) => item.productCategory === "drinks");
  const desert = products?.filter((item) => item.productCategory === "deserts");
  const fruits = products?.filter((item) => item.productCategory === "fruits");
  const rice = products?.filter((item) => item.productCategory === "rice");
  const curry = products?.filter((item) => item.productCategory === "curry");
  const chinese  = products?.filter((item) => item.productCategory === "chinese");
  const bread = products?.filter((item) => item.productCategory === "bread");


  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        dispatch(setAllProducts(data));
      });
      console.log("from use effect", products);
    }
  }, [products, dispatch]);
  return (
    <div className=" flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className=" grid w-full grid-cols-1 md:grid-cols-2 gap-2 h-full align-middle">
        <div className=" flex items-center justify-center w-full">
            <div className=" w-9/12">
            <CChart
  type="bar"
  data={{
    labels: ['Drinks', 'Deserts', 'Fruits', 'Rice', 'Curry', 'Chinese', 'Bread'],
    datasets: [
      {
        label: 'Category wise Count',
        backgroundColor: '#f87979',
        data: [drinks?.length,desert?.length,fruits?.length,rice?.length,curry?.length,chinese?.length,bread?.length],
      },
    ],
  }}
  labels="months"
  options={{
   
  }}
/>
            </div>
        </div>
        <div className=" w-full h-full flex items-center justify-center">
            <div className=" w-9/12">
            <CChart
  type="doughnut"
  data={{
    labels: ['Drinks', 'Deserts', 'Fruits', 'Rice', 'Curry', 'Chinese', 'Bread'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16','#ad63c5','#af4411','#ffa90c'],
        data: [drinks?.length,desert?.length,fruits?.length,rice?.length,curry?.length,chinese?.length,bread?.length],
      },
    ],
  }}
  options={{}}
/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DbHome;
