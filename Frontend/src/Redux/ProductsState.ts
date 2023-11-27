import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// 1. Products state object -> class component
// products: ProductModel[]

// 2. enum -> ProductsActionTypes
// ProductsActionTypes = "setProducts", "addProduct", "editProduct", "deleteProduct"

// 3. interface -> ProductActions - {type,data}

// 4. switch function -> will perform action by chosen type - "reducer"

// 5. store - create -> pass the reducer 


// 1.
export class ProductsState {
    products: ProductModel[] = [];
    // best selling product, last updated, most recent addition... 
}

// 2.
export enum ProductsActionTypes {
    SetProducts = "SetProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
    ClearAll = "ClearAll"
}

// 3.
export interface ProductsActions {
    type: ProductsActionTypes,
    payload?: any
}

// 4.
function productsReducer(currentState = new ProductsState(), action: ProductsActions): ProductsState {
    const newState = { ...currentState };
    switch (action.type) {
        case ProductsActionTypes.SetProducts:
            newState.products = action.payload;
            break;
        case ProductsActionTypes.AddProduct:
            newState.products.push(action.payload);
            break;
        case ProductsActionTypes.DeleteProduct:
            const idForDelete = newState.products.findIndex(p => p.id === action.payload)
            newState.products.splice(idForDelete, 1);
            break;
        case ProductsActionTypes.UpdateProduct:
            const idForUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            newState.products.splice(idForUpdate, 1, action.payload);
            break;
        case ProductsActionTypes.ClearAll:
            newState.products = [];
            break;
    }
    return newState;
}

// 5.
export const productsStore = createStore(productsReducer);

// const productState = new ProductsState();
// export default productState;