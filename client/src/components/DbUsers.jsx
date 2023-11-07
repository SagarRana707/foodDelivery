import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsersDetail } from '../context/actions/allUserActions';
import { getAllUsers } from '../api';
import UsersTable from './usersTable';
const DbUsers = () => {
    const allUsers = useSelector(state => state.allUsers);
    const dispatch = useDispatch();
    useEffect(() => {
if(!allUsers){
getAllUsers().then(data => {
    dispatch(setAllUsersDetail(data));
})
}
    },[dispatch,allUsers]);
    
      
      if(!allUsers || allUsers === null){
        return <div className="flex justify-center items-center pt-6 gap-2 w-full">No users</div>
      }
    else{return (  
    <div className="flex justify-center items-center pt-6 gap-2 w-full">
    <UsersTable
      allUsers={allUsers}
    /> </div> )};
}
 
export default DbUsers;