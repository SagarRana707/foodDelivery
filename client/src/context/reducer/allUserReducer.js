const allUserReducer = (state = null, actions) => {
    switch (actions.type) {
      case "GET_ALL_USERS":
        return state;
      case "SET_ALL_USERS":
        return actions.allUsers;
     default:
        return state;
    }
}
export default allUserReducer;