import { getAuth } from "firebase/auth";
import "./App.css";
import { app } from "./config/firebase.config";
import { useEffect, useState } from "react";
import { getAllCartItems, validateUsersJwtToken } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userAction";
import { motion} from "framer-motion";
import { fadeInOut } from "./animations";
import { Alert, Cart, FilterSection, HomeSlider, MainLoader } from "./components";
import Home from "./components/home";
import { setCartItems } from "./context/actions/cartAction";
function App() {
  const dispatch =  useDispatch();
  const firebaseAuth = getAuth(app);
  const alert = useSelector(state => state.alert);
  const isCart = useSelector(state => state.isCart);
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
  }, [dispatch,firebaseAuth]);
  return <div>
    {isLoading && (
      <motion.div {...fadeInOut} className=" fixed z-50 bg-cardOverlay inset-0 backdrop-blur-md flex justify-center items-center
       w-full">
<MainLoader />
      </motion.div>
    )}
    { alert?.type && <Alert type={alert?.type} message={alert?.type}/>}
    <Home/>
    <HomeSlider/>
    <FilterSection/>
    {isCart && <Cart/>}
    </div>;
}

export default App;
