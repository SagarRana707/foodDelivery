import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
const DbLeftSection = () => {
  return (
    <div className=" h-full py-6 flex flex-col backdrop-blur-md bg-cardOverlay shadow-md min-w-210 w-300 gap-0">
      <NavLink
        to={"/"}
        className={"flex justify-start items-center gap-2 px-5"}
      >
        <img src={logo} alt="logo" height={"35px"} width={"35px"} />
        <p className=" text-xl font-extrabold">City</p>
      </NavLink>
      <hr className=" bg-[#f3f0f0] h-[1px]" />
      <ul className="flex flex-col gap-2">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-solid border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-solid border-l-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-solid border-red-500`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-solid border-l-red-500`
              : isNotActiveStyles
          }
        >
          Add New Item
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-solid border-l-red-500`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink>
      </ul>
      <div className=" w-full flex items-center justify-center mt-auto px-2 gap-2 h-fit">
        <div className=" w-full h-full rounded-md bg-red-400 py-4  flex justify-center items-center flex-col gap-3 px-3">
          <div className=" w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <p className=" text-red-400">?</p>
          </div>
          <p className=" text-white font-extrabold">Help Center</p>
          <p className=" text-white text-xs text-center">Having touble in city. Please contact us for more questions</p>
          <p className=" text-red-400 rounded-3xl bg-white px-2 py-1 cursor-pointer">Get in touch</p>
        </div>
      </div>
    </div>
  );
};

export default DbLeftSection;
