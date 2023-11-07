import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../context/actions/productActions";
import { getAllProduct } from "../api";
import Table from "./materialItemTabel";

const DbItems = () => {
  const [items, setitems] = useState([]);
  const dispatch = useDispatch();
    const products  = useSelector(state => state?.products);
    useEffect(() => {
        if(!products){
            getAllProduct().then(data => {
                dispatch(setAllProducts(data));
                setitems(data);
            });
            console.log("from use effect",products);
        }
    }, [products,dispatch]);
  const data = useSelector((state) => state.products);

  if(!data || data === null){
    return(<div>no Items</div>)
  }else{
return (<Table data={items} setitems={setitems}/>)
  }
 
  
};

export default DbItems;
