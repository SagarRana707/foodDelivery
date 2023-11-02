import React from 'react';
import DbHeader from './DBheader';
import { useLocation } from 'react-router-dom';
import { DbHome, DbItems, DbNewItem, DbOrders, DbUsers } from "./index";
const DbRightSection = () => {
   const location = useLocation();
   let path =location.pathname;
    return ( <div className=' flex flex-col flex-1 h-full '>
        <DbHeader/>
        <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
            {path === "/dashboard/home" && <DbHome/>}
            {path === "/dashboard/newItem" && <DbNewItem/>}
            {path === "/dashboard/items" && <DbItems/>}
            {path === "/dashboard/orders" && <DbOrders/>}
            {path === "/dashboard/users" && <DbUsers/>}
        </div>
    </div> );
}
 
export default DbRightSection;