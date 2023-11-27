import { NavLink } from "react-router-dom";
import "./Menu.css"
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";
import TotalEmployees from "../../EmployeesArea/TotalEmployees/TotalEmployees";
import TotalCategories from "../../CategoriesArea/TotalCategories/TotalCategories";
import UserModel from "../../../Models/UserModel";
import { useState } from "react";
function Menu():JSX.Element{

   

    return(
        <div className="Menu">
            <NavLink to="/home/">Home</NavLink>
            <NavLink to="/products/">Products</NavLink>
            <NavLink to="/employees/">Employees</NavLink>
            {

                <NavLink to="/categories/">Categories</NavLink>
            }

            <NavLink to="/contactUs/">About</NavLink>
            <TotalProducts />
            <TotalEmployees/>
            <TotalCategories />
            
            {/* <a href="/home">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a> */}
        </div>
    )
}
export default Menu;