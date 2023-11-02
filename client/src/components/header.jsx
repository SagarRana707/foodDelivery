import React, { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";
import { avatar, logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { setUserNull } from "../context/actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true });
    }).catch((err) => console.error(err));
  };
  return (
    <header className="flex justify-between items-center backdrop-blur-md z-50 inset-x-0 top-0 px-6 py-2 md:px-8 w-full">
      <NavLink to={"/"} className={"flex justify-center items-center gap-1"}>
        <img src={logo} alt="logo" height={"25px"} width={"25px"} />
        <p className=" text-xl font-extrabold">City</p>
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
            <div
              onMouseEnter={() => {
                setIsMenu(true);
              }}
              className=" h-12 w-12 rounded-full shadow-md cursor-pointer overflow-hidden
                bg-green-300"
            >
              <motion.img
                className=" w-full h-full object-cover"
                src={user?.picture ? user?.picture : avatar}
                whileHover={{ scale: 1.15 }}
                referrerPolicy="no-referrer"
              ></motion.img>
            </div>
            {isMenu && (
              <motion.div
                {...slideTop}
                onMouseLeave={() => {
                  setIsMenu(false);
                }}
                className=" px-4 py-2 bg-cardOverlay backdrop-blur-md rounded-md absolute top-12 right-0 flex flex-col gap-4 shadow-md"
              >
                <Link
                  className=" hover:text-red-500 text-1xl text-textColor"
                  to={"/dashboard/home"}
                >
                  DashBoard
                </Link>
                <Link
                  className=" hover:text-red-500 text-1xl text-textColor"
                  to={"/profile"}
                >
                  MyProfile
                </Link>
                <Link
                  className=" hover:text-red-500 text-1xl text-textColor"
                  to={"/userOrders"}
                >
                  Order
                </Link>
                <motion.div
                  {...buttonClick}
                  onClick={signOut}
                  className=" group flex items-center justify-center px-2 py-1 rounded-md shadow-md bg-gray-100 hover:bg-gray-200"
                >
                  <MdLogout className=" text-textColor group-hover::text-headingColor" />
                  <p className="text-sm text-textColor group-hover::text-headingColor">
                    SignOut
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        ) : (
          <NavLink to={"/login"}>
            <motion.button
              {...buttonClick}
              className=" px-4 py-2 rounded-md shadow-md bg-cardOverlay border-1 border-red-300 cursor-pointer"
            >
              LogIn
            </motion.button>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
