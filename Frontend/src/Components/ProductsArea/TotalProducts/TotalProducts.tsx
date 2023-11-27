import { useEffect, useState } from "react";
import productsService from "../../../Services/ProductsService";
import "./TotalProducts.css";
import NotificationService from "../../../Services/NotificationService";
import { productsStore } from "../../../Redux/ProductsState";

function TotalProducts(): JSX.Element {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        productsService.getAllProducts()
            .then(products => setCount(products.length))
            .catch(err => NotificationService.error(err))

        const unsubscribe = productsStore.subscribe(() => {
            setCount(productsStore.getState().products.length)
        });

        return unsubscribe;
    }, []);

    return (
        <div className="TotalProducts">
            <p>Total Products: {count}</p>
        </div>
    );
}

export default TotalProducts;
