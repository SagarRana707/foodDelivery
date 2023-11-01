import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      <header className="flex justify-between items-center backdrop-blur-md z-50 inset-x-0 top-0 px-12 py-6 md:px-20">
        <NavLink to={"/"} className={"flex justify-center items-center gap-4"}>
          <img src={logo} alt="logo" height={"25px"} width={"25px"} />
        </NavLink>
        <nav className="flex justify-centeritems-center gap-8">
          <ul className=" hidden md:flex justify-center gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/menu"}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
            >
              Menu
            </NavLink>
            <NavLink
              to={"/services"}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
            >
              Services
            </NavLink>
            <NavLink
              to={"/aboutUs"}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
            >
              AboutUs
            </NavLink>
          </ul>
          <motion.div
            {...buttonClick}
            className=" relative flex justify-center items-center"
          >
            <MdShoppingCart className=" text-2xl text-textColor" />
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-1 -right-2">
              <p className="text-white font-semibold ">2</p>
            </div>
          </motion.div>
          {user ? (
            <div className=" relative cursor-pointer">
              <div className=" h-12 w-12 rounded-full shadow-md cursor-pointer overflow-hidden
                bg-green-300">
                <motion.img className=" w-full h-full object-cover"></motion.img>
               </div>
            </div>
          ) : (
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className=" px-4 py-2 rounded-md shadow-md bg-cardOverlay border-1 border-red-300 cursor-pointer
                "
              >
                LogIn
              </motion.button>
            </NavLink>
          )}
        </nav>
      </header>
    </Router>
  );
};

export default Header;
