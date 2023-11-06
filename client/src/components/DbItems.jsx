import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";


const DbItems = () => {
  const data = useSelector((state) => state.products);
  const editProduct = (rowData) => {
console.log(rowData);
  };

  const columns = [
    // {
    //   header: "Actions",
    //   Cell: ({ rowData ,}) => (
    //     <div>
    //       <button
    //         onClick={() => {
    //           editProduct(rowData);
    //         }} // Define your edit action here
    //         className="btn-edit"
    //       >
    //         Edit
    //       </button>
    //       <button
    //         onClick={() => {
    //           console.log(rowData);
    //         }} // Define your delete action here
    //         className="btn-delete"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
    {
      accessorKey: "imageUrl",
      header: "Image",
      Cell: ({ renderedCellValue }) => (
        <img
          src={renderedCellValue}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      accessorKey: "productName",
      header: "Name",
    },
    {
      accessorKey: "productCategory",
      header: "Category",
    },
    {
      accessorKey: "productPrice",
      header: "Price",
      Cell: ({ renderedCellValue }) => (
        <div className=" flex items-center">
          <FaRupeeSign className=" text-red-500" />
          <span className=" font-bold">{renderedCellValue}</span>
        </div>
      ),
    },
  ];

  const table = useMaterialReactTable({
    data,
    columns,
  });

  return (
    <div className="flex justify-center items-center pt-6 gap-2 w-full">
      <MaterialReactTable
        table={table}
      />
      
    </div>
  );
};

export default DbItems;
