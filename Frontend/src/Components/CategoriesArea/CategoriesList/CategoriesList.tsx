import { useEffect, useState } from "react";
import "./CategoriesList.css";
import categoriesServices from "../../../Services/CategoriesServices";
import CategoriesModel from "../../../Models/CategoriesModel";
import noti from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import AddImg from "../../../Assets/Images/addIcon3.png"
import DeleteAllCategoriesImg from "../../../Assets/Images/trashcan.png"
import { CategoryAction, categoriesState, categoryActionTypes } from "../../../Redux/CategoriesState";

function CategoriesList(): JSX.Element {

    const [feCategories, setFeCategories] = useState<CategoriesModel[]>();
    const navigate = useNavigate()
    useEffect(() => {
        categoriesServices.getAllCategories()
            .then(beCategories => setFeCategories(beCategories))
            .catch(err => {
                switch (err.response.status) {
                    case 401:
                        navigate(appConfig.loginRoute);
                        noti.error("Please login to proceed");
                        break;
                }
                console.log(err.response.status)
            })

    }, []);

    function clearAll() {
        const action: CategoryAction = { type: categoryActionTypes.ClearCategories }
        categoriesState.dispatch(action);
    }

    function deleteRow(id: number) {
        categoriesServices.deleteCategory(id);
    }


    return (
        <div className="CategoriesList">
            <div className="actions">
                <NavLink to={"/categories/new/"}><img src={AddImg} /></NavLink>
                <NavLink to={"/home/"} onClick={clearAll}> <img src={DeleteAllCategoriesImg} /> </NavLink>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feCategories?.map(c =>
                        // <NavLink to={'/home/'}>

                        <tr key={c.id} >
                            <td>{c.name}</td>
                            <td>{c.description}</td>
                            <td><img src={appConfig.categoriesUrl + "/images/" + c.imageName} /></td>
                            <td><NavLink to={appConfig.CategoriesDetailsRoute+c.id} >Actions</NavLink></td>
                        </tr >
                        // </NavLink>
                    )}

                </tbody>
            </table>
        </div>
    );
}

export default CategoriesList;
