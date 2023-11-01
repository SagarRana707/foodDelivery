const alertReducer = (state = null, actions) => {
switch(actions.type){
    case "SET_SUCCESS":return actions.alert;
    case "SET_WARNING":return actions.alert;
    case "SET_INFO":return actions.alert;
    case "SET_DANGER":return actions.alert;
    case "SET_ALERT_NULL":return actions.alert;
default : return state;

}
}
export default alertReducer;