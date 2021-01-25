import { RootReducer } from './../reducers/RootReducer';
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

export const Store = createStore(RootReducer,applyMiddleware(thunk));
export type RootStore = ReturnType <typeof RootReducer>

// without thunk

// return { 
//     type:"",
//     payLoad:[]
// }

// with thunk 

// return ()=>{

// }