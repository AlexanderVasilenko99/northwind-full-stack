import { useEffect, useState } from "react";
import "./TotalCategories.css";
import { categoriesState } from "../../../Redux/CategoriesState";
import categoryServices from "../../../Services/CategoriesServices";
import noti from "../../../Services/NotificationService";

function TotalCategories(): JSX.Element {

    const [count, setCount] = useState(0);
    useEffect(() => {

        categoryServices.getAllCategories()
            .then(c => {
                setCount(categoriesState.getState().categories.length);
            })
            .catch((err: any) => noti.error(err));

        const unsubscribe = categoriesState.subscribe(()=>{
            setCount(categoriesState.getState().categories.length)
        });

        return unsubscribe;

    }, []);

    return (
        <div className="TotalCategories">
            <p>Total Categories: {count}</p>
        </div>
    );
}

export default TotalCategories;
