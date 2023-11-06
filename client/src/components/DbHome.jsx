import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../api';
import { setAllProducts } from '../context/actions/productActions';
const DbHome = () => {
    const dispatch = useDispatch();
    const products  = useSelector(state => state.products);
    useEffect(() => {
        if(!products){
            getAllProduct().then(data => {
                dispatch(setAllProducts(data));
            });
            console.log("from use effect",products);
        }

    }, [products,dispatch])
    return ( <div>
        home
    </div> );
}
 
export default DbHome;