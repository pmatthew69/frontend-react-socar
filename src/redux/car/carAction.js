const store_car_success = (payload) => {
    return {
        type: "STORE_CAR_SUCCESS",
        payload: payload,
    };
};

export const storeCar = ( car ) => {
    return async (dispatch) => {
        dispatch(
            store_car_success(car)
        )
    };
};