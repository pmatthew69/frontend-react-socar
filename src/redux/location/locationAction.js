const store_location_success = (payload) => {
    return {
        type: "STORE_LOCATION_SUCCESS",
        payload: payload,
    }
}

const store_location_failed = (payload) => {
    return {
        type: "STORE_LOCATION_FAILED",
    }
}

export const storeLocation = ( location ) => {
    return async (dispatch) => {
        dispatch(
            store_location_success(location)
        );
        console.log(location)
    };
}