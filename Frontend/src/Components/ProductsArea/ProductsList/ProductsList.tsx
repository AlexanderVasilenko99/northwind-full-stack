import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import ProductCard from "../ProductCard/ProductCard";
import "../ProductsList/ProductsList.css";
import { NavLink } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import DeleteAllProductsImg from "../../../Assets/Images/trashcan.png";
import AddImg from "../../../Assets/Images/addIcon3.png";
import { ProductsActionTypes, ProductsActions, productsStore } from "../../../Redux/ProductsState";

function ProductsList(): JSX.Element {
    // usestate
    let [feProducts, setFeProducts] = useState<ProductModel[]>();
    // useefect ot fetch only once
    useEffect(() => {
        productsService.getAllProducts()
            .then(beProducts => setFeProducts(beProducts))
            .catch(err => console.log(err));
    }, []);

    function clearAll(): void {
        const action: ProductsActions = { type: ProductsActionTypes.ClearAll }
        productsStore.dispatch(action)
    }

    if (!feProducts || feProducts.length === 0) return <Spinner />
    return (
        <div className="ProductsList">
            <div className="actions">
                <NavLink to={"/products/new/"}><img src={AddImg} /></NavLink>
                <NavLink to={"/home/"} onClick={clearAll}> <img src={DeleteAllProductsImg} /> </NavLink>
            </div>

            {/* don't forget this fucker ---> `?` */}
            {feProducts?.map(p =>
                <NavLink key={p.id} to={`/products/product/` + p.id}>
                    <ProductCard key={p.id} product={p} />
                </NavLink>
            )}
        </div >
    );
}

export default ProductsList;
