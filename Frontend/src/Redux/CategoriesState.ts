import { createStore } from "redux";
import CategoriesModel from "../Models/CategoriesModel";

export class CategoriesState {
    public categories: CategoriesModel[];
}
export enum categoryActionTypes {
    SetCategories = "GetAllCategories",
    AddCategory = "AddCategory",
    DeleteCategory = "DeleteCategory",
    EditCategory = "EditCategory",
    ClearCategories = "ClearCategories"
}
export interface CategoryAction {
    type: categoryActionTypes;
    payload?: any;
}
function categoryReducer(currentState = new CategoriesState(), action: CategoryAction): CategoriesState {
    const newState = { ...currentState };
    switch (action.type) {
        case categoryActionTypes.SetCategories:
            newState.categories = action.payload;
            break;
        case categoryActionTypes.AddCategory:
            newState.categories.push(action.payload)
            break;
        case categoryActionTypes.DeleteCategory:
            const idForDelete = newState.categories.findIndex(c => c.id === action.payload);
            newState.categories.splice(idForDelete, 1);
            break;
        case categoryActionTypes.EditCategory:
            const idForUpdate = newState.categories.findIndex(c => c.id === action.payload);
            newState.categories.splice(idForUpdate, 1, action.payload);
            break;
        case categoryActionTypes.ClearCategories:
            newState.categories = [];
            break;
    }
    return newState;
}
export const categoriesState = createStore(categoryReducer);