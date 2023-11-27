import ProductModel from "../../../Models/ProductModel";
import appConfig from "../../../Utils/AppConfig";
import "./ProductCard.css";

type ProductProps = {
    product: ProductModel;
}

function ProductCard(props: ProductProps): JSX.Element {

    return (
        <div className="ProductCard">
            <div>
                Name: {props.product.name}
                <br />
                Price: {props.product.price}
                <br />
                Stock: {props.product.stock}
                <br />
            </div>
            <div>
                <img src={props.product.imageUrl} alt="broken" />
            </div>
        </div>
    );
}

export default ProductCard;
