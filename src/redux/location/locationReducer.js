const initialState = {
    lat: 59.95,
    lng: 30.33
}

const locationReducer = ( state = initialState, action ) => {
    switch(action.type){
        case "STORE_LOCATION_SUCCESS":
            return {
                ...state,
                lat: action.payload.lat,
                lng: action.payload.lng,
            };
        case "STORE_LOCATION_FAILED":
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

export default locationReducer;