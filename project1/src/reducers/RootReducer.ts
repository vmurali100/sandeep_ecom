import { productReducer } from './ProductReducer';
import { combineReducers } from "redux";

export const RootReducer = combineReducers({products:productReducer})