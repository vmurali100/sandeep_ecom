import { ProductActionTypes, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './../actions/ProductActionTypes';
export const defaultState = {
    products:[]
}
export const productReducer = (state=defaultState,action:ProductActionTypes) =>{
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return action.payLoad
        
        case ADD_PRODUCT:
            return action.payLoad

        case UPDATE_PRODUCT:
            return action.payLoad;
        
        case DELETE_PRODUCT:
            return action.payLoad


        default:
            return state.products
    }
}