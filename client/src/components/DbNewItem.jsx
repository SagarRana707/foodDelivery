import React, { useState } from "react";
import { statuses } from "../utils/styles";
import {Spiner} from "./index";
const DbNewItem = () => {
  const [itemName, setItemName] = useState();
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
                  onClick={() => {setCategory(data.category)}}
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
            {isLoading ? <div className=" flex flex-col justify-evenly items-center w-full h-full rounded-md"><Spiner/></div> : <></>}
        </div>
      </div>
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
