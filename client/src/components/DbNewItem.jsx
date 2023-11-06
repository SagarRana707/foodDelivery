import React, { useState } from "react";
import { statuses } from "../utils/styles";
import { Alert, Spiner } from "./index";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNull,
  alertSuccess,
} from "../context/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { MdDelete } from "react-icons/md";
import { addNewProduct, getAllProduct } from "../api";
import { setAllProducts } from "../context/actions/productActions";
const DbNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(null);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `/images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image successfull uploaded to cloud"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 2000);
        });
      }
    );
  };
  const deleteImageFromFirebase = (url) => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadUrl);
    deleteObject(deleteRef)
      .then(() => {
        setImageDownloadUrl(null);
        setIsLoading(false);
        dispatch(alertSuccess("Image removed from cloud SuccessFully"));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const submitNewData =async () => {
const data = {
  productName : itemName,
  productCategory : category,
  productPrice : price,
  imageUrl : imageDownloadUrl
};
addNewProduct(data).then(res => {
  console.log("RESPonce from api : ",res );
  dispatch(alertSuccess("New Item is addded"));
   setTimeout(() => {
     dispatch(alertNull());
   }, 3000);
   setImageDownloadUrl(null);
   setItemName("");
   setPrice("");
   setCategory(null);
});
 getAllProduct().then(data => {
  dispatch(setAllProducts(data));
 });
  };
  return (
    <div className=" flex flex-col justify-center items-center px-3 py-2">
      <div className=" border border-solid border-gray-300 rounded-md p-3 w-full flex flex-col items-center justify-center gap-2">
        <InputValueField
          type={"text"}
          placeHolder={"Item name here"}
          stateFunctions={setItemName}
          stateValue={itemName}
        />
        <div className=" w-full flex items-center justify-around gap-2 flex-wrap py-2">
          {statuses &&
            statuses?.map((data) => {
              return (
                <p
                  key={data.id}
                  onClick={() => {
                    setCategory(data.category);
                  }}
                  className={`px-2 py-1 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md
 border border-gray-200 border-solid backdrop-blur-md ${
   data.category === category ? "bg-red-400 text-primary" : " bg-transparent"
 }`}
                >
                  {data.title}
                </p>
              );
            })}
        </div>
        <InputValueField
          type={"number"}
          placeHolder={"Item price here"}
          stateFunctions={setPrice}
          stateValue={price}
        />
        <div className=" w-full bg-card backdrop-blur-md h-225 rounded-md border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className=" flex flex-col justify-evenly items-center w-full h-full rounded-md">
              <Spiner />
              {Math.round(progress) && (
                <div className=" w-full h-full flex flex-col justify-center items-center gap-2">
                  <div className=" flex justify-between w-full">
                    <span className=" text-base text-textColor font-medium">
                      Progress
                    </span>
                    <span className=" text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>
                  <div className=" w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className=" bg-red-600 rounded-full h-2.5 transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.round(progress)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : !imageDownloadUrl ? (
            <>
              <label>
                <div className=" flex justify-center items-center cursor-pointer w-full h-full">
                  <div className=" flex flex-col justify-center items-center cursor-pointer w-full h-full">
                    <p className=" font-bold text-2xl">
                      <FaCloudUploadAlt className=" -rotate-0" />
                    </p>
                    <p className=" text-textColor text-lg">
                      Click to upload image
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    name="upload-image"
                    className=" w-0 h-0"
                    onChange={uploadImage}
                  />
                </div>
              </label>
            </>
          ) : (
            <>
              <div className=" w-full h-full relative overflow-hidden rounded-md">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  src={imageDownloadUrl}
                  className=" w-full h-full object-cover"
                />
                <motion.button
                  {...buttonClick}
                  className=" absolute top-2 right-2 p-2 rounded-full bg-red-500 text-xl cursor-pointer
 outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                  onClick={() => deleteImageFromFirebase(imageDownloadUrl)}
                >
                  <MdDelete className=" -rotate-0" />
                </motion.button>
              </div>
            </>
          )}
        </div>
        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className=" w-9/12 py-2 rounded-md bg-red-400 text-primary text-center hover:bg-red-500 cursor-pointer"
        >
          Save
        </motion.button>
      </div>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};
export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunctions,
}) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      className=" w-full px-2 py-1 bg-cardOverlay shadow-md outline-none rounded-md border-gray-200
     focus:border-red-400 border-solid border"
      value={stateValue}
      onChange={(e) => {
        stateFunctions(e.target.value);
      }}
    />
  );
};

export default DbNewItem;
