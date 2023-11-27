import axios from "axios";
import appConfig from "../Utils/AppConfig";
import noti from "./NotificationService";
import CategoriesModel from "../Models/CategoriesModel";
import { authStore } from "../Redux/AuthState";
import { CategoriesState, CategoryAction, categoriesState, categoryActionTypes } from "../Redux/CategoriesState";
import interceptors from "../Utils/Interceptors";

class CategoriesServices {
    public async getAllCategories(): Promise<CategoriesModel[]> {
        // try {
        // const token = authStore.getState().token;
        // const options = {
        //     headers: { "Authorization": `Bearer ${token}` }
        // }

        const response = await axios.get(appConfig.categoriesUrl)//,options
        const categories = response.data;

        const action = { type: categoryActionTypes.SetCategories, payload: categories }
        categoriesState.dispatch(action);

        return categories;
    }
    // catch (err: any) { noti.error(err) }



    public async getOneCategory(cId: number): Promise<CategoriesModel> {
        // const token = authStore.getState().token;
        // const options = {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // }


        const response = await axios.get(appConfig.categoriesUrl + cId);//,options
        const category = response.data;

        return category;
    }


    public async addCategory(category: CategoriesModel) {
        // const token = authStore.getState().token;
        // const options = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "Authorization": `Bearer ${token}`
        //     }

        // }
        const response = await axios.post(appConfig.categoriesUrl, category)//.options
        const categories = response.data;

        return categories
    }
    public async deleteCategory(id: number) {
        const token = authStore.getState().token;
        await axios.delete(appConfig.categoriesUrl + id);

        const action: CategoryAction = { type: categoryActionTypes.DeleteCategory, payload: id }
        categoriesState.dispatch(action);
    }
    public async updateCategory(category: CategoriesModel) {

    }

}
const categoryServices = new CategoriesServices();
export default categoryServices;