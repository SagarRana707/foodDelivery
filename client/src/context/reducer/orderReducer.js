const orderReducer = (state = null, actions) => {
  switch (actions.type) {
    case "GET_ORDERS":
      return state;
    case "SET_ORDERS":
      return actions.orders;
    default:
      return state;
  }
};
export default orderReducer;
