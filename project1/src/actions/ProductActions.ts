import { Product } from './../DashBoard';
import { ProductActionTypes, GET_ALL_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from './ProductActionTypes';
import { Dispatch } from "react"
import axios from 'axios';

export const getAllProducts = () => async (dispatch:Dispatch<ProductActionTypes>)=>{
    try {
        const res = await axios.get("http://localhost:3000/products")
        dispatch({
            type:GET_ALL_PRODUCTS,
            payLoad:res.data
        })
        
    } catch (error) {
        
    }
}

export const addProductAction = (product:Product) => async (disatch:Dispatch<ProductActionTypes>)=>{
    console.log(product)
    try {
        const res = await axios.post("http://localhost:3000/products",product);
        const response = await axios.get("http://localhost:3000/products");
        disatch({
            type:ADD_PRODUCT,
            payLoad:response.data
        })
    } catch (error) {
        
    }
    
}

export const deleteProduct = (id:number) => async (dispatch:Dispatch<ProductActionTypes>) => {
    try {
        const res = await axios.delete("http://localhost:3000/products/"+id);
        const response = await axios.get("http://localhost:3000/products");
        dispatch({
            type:DELETE_PRODUCT,
            payLoad:response.data
        })

    } catch (error) {
        
    }
}

export const updateProduct = (product:Product)=> async (dispatch:Dispatch<ProductActionTypes>) => {
    try {
        const res = await axios.put("http://localhost:3000/products/"+product.id,product);
        const response = await axios.get("http://localhost:3000/products");
        dispatch({
            type:UPDATE_PRODUCT,
            payLoad:response.data
        })
    } catch (error) {
        
    }
}