import axios from "axios";
import appConfig from "../Utils/AppConfig";
import ProductModel from "../Models/ProductModel";
import { ProductsActionTypes, ProductsActions, productsStore } from "../Redux/ProductsState";

class ProductsService {
    public async getAllProducts(): Promise<ProductModel[]> {
        // // Get all products into response obj
        // const response = await axios.get(appConfig.productsUrl);

        // // extract products from response
        // const products = response.data;

        // // return products
        // return products;





        // check if all products are in state
        // if not get from server
        // save to state
        // return

        let products = productsStore.getState().products;
        if (products.length === 0) {
            const response = await axios.get(appConfig.productsUrl);
            products = response.data;

            const action: ProductsActions = { type: ProductsActionTypes.SetProducts, payload: products }
            productsStore.dispatch(action);
        }
        return products;
    }

    public async getOneProduct(prodId: number): Promise<ProductModel> {
        const response = await axios.get(appConfig.productsUrl + prodId)
        const product = response.data;
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        // send product to backend via POST method
        const response = await axios.post(appConfig.productsUrl, product, options);
        // extract product from response
        const beProduct = response.data;

        const action: ProductsActions = { type: ProductsActionTypes.AddProduct, payload: beProduct }
        productsStore.dispatch(action);

        // return extracted product
        return beProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {

        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.put(appConfig.productsUrl + product.id, product, options);
        const updateProduct = response.data;

        const action = {type: ProductsActionTypes.UpdateProduct, payload:updateProduct}
        productsStore.dispatch(action);

        return updateProduct;
    }

    public async deleteProduct(prodId: number): Promise<void> {
        await axios.delete(appConfig.productsUrl + prodId);

        const action: ProductsActions = { type: ProductsActionTypes.DeleteProduct, payload: prodId }
        productsStore.dispatch(action);
    }


}
const productsService = new ProductsService();
export default productsService;