import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import Spinner from "../../Spinner/Spinner";
import "../ProductCard/ProductCard.css";
import "./ProductDetails.css";
import NotificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";

function ProductDetails(): JSX.Element {

    const [feProduct, setFeProduct] = useState<ProductModel>()

    const params = useParams();
    const id = +params.productId;

    const navigate = useNavigate()


    useEffect(() => {
        productsService.getOneProduct(id)
            .then(beProducts => setFeProduct(beProducts))
            .catch(err => console.log(err))
    }, []);


    async function deleteMe() {
        try {
            const ok = window.confirm(`Are you sure you want to delete item ${id}?`);

            if (!ok) return;

            await productsService.deleteProduct(id);
            NotificationService.success(`product #${id} has been deleted`);
            navigate("/products");

        }
        catch (err: any) {
            NotificationService.error(err)
        }

    }

    if (!feProduct) return <Spinner />
    return (

        <div className="ProductCard">
            <div>
                Name: {feProduct?.name}
                <br />
                Price: {feProduct?.price}
                <br />
                Stock: {feProduct?.stock}
                <br />
            </div>
            <div>
                <img src={feProduct?.imageUrl} alt="broken" />
            </div>
            <div>
                <NavLink to={`/products/`} className={"ProductDetails"}>Back</NavLink>
                <NavLink to={`/products/edit/${id}`} >Edit</NavLink>
                <NavLink to={`#`} onClick={deleteMe}>Delete</NavLink>
            </div>
        </div>


    );
}

export default ProductDetails;
