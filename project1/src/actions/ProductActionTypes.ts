import { Product } from "../DashBoard";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const ADD_PRODUCT= "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT="UPDATE_PRODUCT";


export type ProductType = {
    products:Product[]
}
export type GetAllProducts = {
    type : typeof GET_ALL_PRODUCTS,
    payLoad?:ProductType
}

export type AddProduct = {
    type : typeof ADD_PRODUCT,
    payLoad?:ProductType
}
export type DeleteProduct = {
    type : typeof DELETE_PRODUCT,
    payLoad?:number

}
export type UpdateProduct = {
    type:typeof UPDATE_PRODUCT,
    payLoad?:ProductType

}

export type ProductActionTypes = GetAllProducts | AddProduct | DeleteProduct | UpdateProduct