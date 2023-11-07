import {
    MaterialReactTable,
    useMaterialReactTable,
  } from "material-react-table";
  import { FaRupeeSign } from "react-icons/fa";
  import { Box, IconButton, Tooltip } from "@mui/material";
  import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import { setAllProducts } from "../context/actions/productActions";
import { deleteProduct, getAllProduct } from "../api";
import { alertNull, alertSuccess, alertWarning } from "../context/actions/alertActions";
import Alert from "./alert";
const Table = (props) => {
  const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const editProduct = async (productId) => {
        window.alert(`Really do you want to edit this productId : ${productId}`);
          };
          const deleteProducts = async (productId) => {
            try {
                dispatch(alertSuccess("Item is deleting..."));
              await deleteProduct(productId).then( async res => {
                console.log(res);
                dispatch(alertSuccess("Item is deleted"));
                setTimeout(() => {
                    dispatch(alertNull());
                  }, 2000);
                  const updatedData = await getAllProduct();
              return  props.setitems(updatedData);
              }); 
            } catch (error) {
              console.error("Error deleting item:", error);
              dispatch(alertWarning("Failed to delete the item"));
           return   setTimeout(() => {
                dispatch(alertNull());
              }, 2000);
            }
          };
          
          
    
  const columns = [
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
  const renderRowActions = (props) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => editProduct(props.row.original.productId)}>
          <MdEdit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => deleteProducts(props.row.original.productId)}>
          <MdDelete/>
        </IconButton>
      </Tooltip>
    </Box>
  );
  const table = useMaterialReactTable({
    data : props.data,
    columns,
    enableRowActions : true,
    renderRowActions : renderRowActions,
  });
  return (
    <div className="flex justify-center items-center pt-6 gap-2 w-full">
    <MaterialReactTable
      table={table}
    /> 
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
  </div>
  )
}
export default Table;