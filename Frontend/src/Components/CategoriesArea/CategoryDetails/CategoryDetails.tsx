import { useEffect, useState } from "react";
import "./CategoryDetails.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import categoryServices from "../../../Services/CategoriesServices";
import appConfig from "../../../Utils/AppConfig";
import noti from "../../../Services/NotificationService";
import CategoriesModel from "../../../Models/CategoriesModel";

function CategoryDetails(): JSX.Element {

    const category = useParams();
    const categoryId = +category.eId;
    const navigate = useNavigate();
    const [feCategory, setFeCategory] = useState<CategoriesModel>();

    useEffect(() => {
        categoryServices.getOneCategory(categoryId)
            .then(c => {
                setFeCategory(c);
                console.log(appConfig.categoriesUrl + "images/" + feCategory.id);

            })
            .catch((err: any) => {
                if (feCategory) { noti.error(err) }
                // else {
                //     switch (err.response.status) {
                //         case 401:
                //             navigate(appConfig.loginRoute)
                //             break;
                //     }
                // }
            });


    }, []);


    return (
        <div className="CategoryDetails">
            {feCategory && <form>
                <h2>Category #{feCategory.id}</h2>
                <h3>Name: {feCategory.name}</h3>
                <h3>Description: {feCategory.description}</h3>
                <h3>Image: <img src={appConfig.categoriesUrl + "images/" + feCategory.imageName} /></h3>
                <NavLink to={appConfig.CategoriesRoute}>Back</NavLink>
            </form>}
        </div>
    );
}

export default CategoryDetails;
