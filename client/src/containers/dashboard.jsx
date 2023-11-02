import React from "react";
import DbLeftSection from "../components/DBleftSection";
import DbRightSection from "../components/DBrightSection";
const Dashboard = () => {
     return(
        <div className=" flex bg-primary items-start  w-full h-full p-0 m-0 box-border">
         <DbLeftSection/>
         <DbRightSection/>
        </div>
     )
}
export default Dashboard;