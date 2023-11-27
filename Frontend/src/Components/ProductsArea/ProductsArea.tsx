import UseTitle from "../../Utils/UseTitle";
import "./ProductsArea.css";
import ProductsList from "./ProductsList/ProductsList";



function ProductsArea(): JSX.Element {
    UseTitle("NorthWind | Products");
    
    return (
        <div className="ProductsArea">
            <ProductsList />
        </div>
    );
}

export default ProductsArea;
