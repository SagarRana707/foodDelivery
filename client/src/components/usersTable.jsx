import {avatar} from "../assets/index";
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from "material-react-table";

const UsersTable = (props) => {
    const columns = [
        {
          accessorKey: "photoURL",
          header: "Image",
          Cell: ({ renderedCellValue }) => (
            <img
              src={renderedCellValue ? renderedCellValue : avatar}
              alt="Product"
              style={{ width: "50px", height: "50px" ,borderRadius : "8px"}}
            />
          ),
        },
        {
          accessorKey: "displayName",
          header: "Name",
        },
        {
          accessorKey: "email",
          header: "Email",
        },
        {
          accessorKey: "emailVerified",
          header: "Verified",
          Cell: ({ renderedCellValue }) => (
            <p className={` px-2 py-1 text-center text-white rounded-md font-bold ${renderedCellValue ? " bg-emerald-500" : "bg-red-500"}`} >
            {renderedCellValue ? "Verified" : "Not Verified"}
            </p>
          ),
        },
      ];
  
  const table = useMaterialReactTable({
    data : props.allUsers,
    columns,
    
  });
  return (
    <div className="flex justify-center items-center pt-6 gap-2 w-full">
    <MaterialReactTable
      table={table}
    /> 
  </div>
  )
}
export default UsersTable;