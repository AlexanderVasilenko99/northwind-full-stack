import { Navigate, Route, Routes } from "react-router-dom";

import EmployeesList from "../../EmployeesArea/EmployeesList/EmployeesList";
import Home from "../../HomeArea/Home/Home";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductsArea from "../../ProductsArea/ProductsArea";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import AddEmployee from "../../EmployeesArea/AddEmployee/AddEmployee";
import EditEmployee from "../../EmployeesArea/EditEmployee/EditEmployee";
import EmployeeDetails from "../../EmployeesArea/EmployeeDetails/EmployeeDetails";
import appConfig from "../../../Utils/AppConfig";
import RegisterComponent from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import CategoriesList from "../../CategoriesArea/CategoriesList/CategoriesList";
import AddCategory from "../../CategoriesArea/AddCategory/AddCategory";
import CategoryDetails from "../../CategoriesArea/CategoryDetails/CategoryDetails";
import ContactUs from "../../AboutArea/ContactUs/ContactUs";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<Navigate to={"/home"} />}></Route>
                <Route path="/home/" element={<Home />} />
                <Route path={appConfig.productsRoute} element={<ProductsArea />} />
                <Route path="/products/product/:productId/" element={<ProductDetails />} />
                <Route path="/products/new/" element={<AddProduct />} />
                <Route path="/products/edit/:prodId" element={<EditProduct />} />
                <Route path="/employees/" element={<EmployeesList />} />
                <Route path="/employees/employee/:eId" element={<EmployeeDetails />} />
                <Route path="/employees/new/" element={<AddEmployee />} />
                <Route path="/employees/edit/:eId" element={<EditEmployee />} />
                <Route path="/register/" element={<RegisterComponent />} />
                <Route path="/login/" element={<Login />} />
                <Route path="/categories/" element={<CategoriesList />} />
                <Route path="/categories/new/" element={< AddCategory />} />
                <Route path="/categories/details/:eId" element={< CategoryDetails />} />
                <Route path="/contactUs" element={< ContactUs />} />

                <Route path="/*" element={<PageNotFound />}></Route>

            </Routes>
        </div>
    );
}

export default Routing;
