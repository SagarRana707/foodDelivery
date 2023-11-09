const cartReducer = (state = null, actions) => {
    switch (actions.type) {
      case "GET_CART_ITEMS":
        return state;
      case "SET_CART_ITEMS":
        return actions.items;
        case "CLEAR_CART_ITEMS":
        return actions.items;
     default:
        return state;
    }
}
export default cartReducer;