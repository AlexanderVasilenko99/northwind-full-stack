import { useForm } from "react-hook-form";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";

import { useNavigate, useParams } from "react-router-dom";

import "./EditProduct.css";
import { useEffect, useState } from "react";
import NotificationService from "../../../Services/NotificationService";
import useImagePreview from "../../../Utils/UseImagePreview";
import appConfig from "../../../Utils/AppConfig";



function EditProduct(): JSX.Element {

    const params = useParams();
    const id = +params.prodId;

    const { register, handleSubmit, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();



    const [imgSrc, setImgSrc] = useState<string>(`${appConfig.productsUrl}/images/${id}.jpg`);
    useEffect(() => {
        productsService.getOneProduct(id)
            .then(product => {
                setValue("name", product.name);
                setValue("price", product.price);
                setValue("stock", product.stock);
                setValue("imageUrl", product.imageUrl);
                setImgSrc(appConfig.productsUrl + `images/${product.imageUrl}`)
                console.log(product);

            })
            .catch((err) => console.log(err));
    }, []);


    function handleChange(e: any) {
        if (e) {
            const file = (e.target.files)[0];
            const url = URL.createObjectURL(file);
            setImgSrc(url);
        }
    }

    async function update(product: ProductModel): Promise<void> {
        try {
            product.image = (product.image as unknown as FileList)[0];
            product.id = id;
            NotificationService.success("product updated  successfully");
            const beProduct = await productsService.updateProduct(product);
            navigate("/products/product/" + beProduct.id);

        } catch (err: any) {
            console.log(err);
        }
    }


    return (
        <div className="EditProduct">
            <h2>
                Edit Product
            </h2>
            <form onSubmit={handleSubmit(update)}>
                <label>Product name: </label><input type="text" {...register("name")} required />
                <label>Product price: </label><input type="number" {...register("price")} required />
                <label>Product stock: </label><input type="number" {...register("stock")} required />

                <label>Product image: </label><input type="file" {...register("image")} accept="image/*" onChange={handleChange} />
                <div className="imageContainer">
                    <img src={imgSrc} />
                </div>
                <button>Update product</button>
            </form>
        </div>
    );
}

export default EditProduct;
