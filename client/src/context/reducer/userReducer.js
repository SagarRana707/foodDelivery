const userReducer = (state = null , action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case "GET_USER":
        return state;

        case "SET_USER": return action.user;

        default : return state;
    }
} 
export default userReducer;