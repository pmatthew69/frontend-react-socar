import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import locationReducer from './location/locationReducer';
import carReducer from './car/carReducer';

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  car: carReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
