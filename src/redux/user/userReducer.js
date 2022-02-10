const initialState = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    loggedin: false,
};

const userReducer = ( state = initialState, action ) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                loggedin: true,
            };
        case "LOGOUT_SUCCESS":
            return {
                ...initialState,               
            };
        default:
            return state;
    }
}

export default userReducer;