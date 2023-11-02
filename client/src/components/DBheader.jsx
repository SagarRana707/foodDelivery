import { motion } from "framer-motion";
import React from "react";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { MdLogout, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick } from "../animations";
import { avatar } from "../assets";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../context/actions/userAction";
const DbHeader = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true });
    }).catch((err) => console.error(err));
  };
  return (
    <div className=" w-full flex justify-between items-center gap-1 px-2 py-3 box-border">
      <p className=" text-sm text-headingColor font-bold">
        Welcome to City{" "}
        {user?.name && (
          <span className=" block text-xs  font-light  ">{`Hello ${user?.name}...!`}</span>
        )}
      </p>
      <div className=" flex justify-between items-center gap-2">
        <div className=" flex justify-between items-center bg-cardOverlay backdrop-blur-md rounded-md px-2">
          <MdSearch className=" text-gray-400" />
          <input
            type="text"
            placeholder="Search Here..."
            className="bg-cardOverlay"
          />
          <BsToggles2 className=" text-gray-400" />
        </div>
        <motion.div
          {...buttonClick}
          className=" flex justify-between items-center bg-cardOverlay backdrop-blur-md rounded-md px-1 py-1"
        >
          <BsFillBellFill className=" text-gray-400" />
        </motion.div>
        <div
          className=" h-7 w-7 rounded-md shadow-md cursor-pointer overflow-hidden
                bg-green-300"
        >
          <motion.img
            className=" w-full h-full object-cover"
            src={user?.picture ? user?.picture : avatar}
            whileHover={{ scale: 1.15 }}
            referrerPolicy="no-referrer"
          ></motion.img>
        </div>
        <motion.div
                  {...buttonClick}
                  onClick={signOut}
                  className=" group flex items-center justify-center px-2 py-1 rounded-md shadow-md bg-gray-100 hover:bg-gray-200"
                >
                  <MdLogout className=" text-textColor group-hover::text-headingColor" />
                </motion.div>
      </div>
    </div>
  );
};

export default DbHeader;
