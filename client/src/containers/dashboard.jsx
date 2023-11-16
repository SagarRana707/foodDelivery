import React, { useEffect, useState } from "react";
import DbLeftSection from "../components/DBleftSection";
import DbRightSection from "../components/DBrightSection";
import { motion } from "framer-motion";
import { MainLoader } from "../components";
import { fadeInOut } from "../animations";
import { setCartItems } from "../context/actions/cartAction";
import { getAllCartItems, getAllUsers, validateUsersJwtToken } from "../api";
import { setUserDetails } from "../context/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setAllUsersDetail } from "../context/actions/allUserActions";
const Dashboard = () => {
  const firebaseAuth = getAuth(app);
    const allUsers = useSelector((state) => state.allUsers);
   const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((usercredential) => {
      if (usercredential) {
        usercredential.getIdToken().then((token) =>
          validateUsersJwtToken(token).then((data) => {
            if(data){
              getAllCartItems(data?.user_id).then( item => {
                dispatch(setCartItems(item));})
            }
            dispatch(setUserDetails(data));
          })
        );
      }

      setIsLoading(false);
    });
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUsersDetail(data));
      });
      setIsLoading(false);
    }
  }, [dispatch,firebaseAuth,allUsers]);
    
     return (
       <div className=" flex bg-primary items-start  w-full h-full p-0 m-0 box-border">
         {isLoading && (
           <motion.div
             {...fadeInOut}
             className=" fixed z-50 bg-cardOverlay inset-0 backdrop-blur-md flex justify-center items-center
       w-full"
           >
             <MainLoader />
           </motion.div>
         )}
         <DbLeftSection />
         <DbRightSection />
       </div>
     );
}
export default Dashboard;