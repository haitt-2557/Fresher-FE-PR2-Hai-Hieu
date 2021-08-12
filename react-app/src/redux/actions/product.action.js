import { GET_PRODUCT_HOME, GET_PRODUCTS, GET_TOTAL_PRODUCTS } from "../constants";

export function getProductHome(params) {
    return {
        type: GET_PRODUCT_HOME,
        payload: params,
    };
}

export function getProducts(params) {
    return {
        type: GET_PRODUCTS,
        payload: params,
    };
}

export function getTotalProducts(params) {
    return {
        type: GET_TOTAL_PRODUCTS,
        payload: params,
    };
}
