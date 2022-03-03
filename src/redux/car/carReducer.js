const initialState = {
    name: "",
    plate: "",
    rate: 0,
    seat: 0,
    petrol: 0,
    distance: 0.0,
}

const carReducer = (state = initialState, action) => {
    switch(action.type) {
        case "STORE_CAR_SUCCESS":
            return{
                ...state,
                name: action.payload.name,
                plate: action.payload.plate,
                rate: action.payload.rate,
                seat: action.payload.seat,
                petrol: action.payload.petrol,
                distance: action.payload.distance,
                origin: action.payload.origin,
            }
        default:
            return state;
    }
}

export default carReducer;