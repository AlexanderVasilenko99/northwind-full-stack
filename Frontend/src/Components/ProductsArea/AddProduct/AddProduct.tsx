import { useForm } from "react-hook-form";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../../Services/NotificationService";
import { useState } from "react";
import useImagePreview from "../../../Utils/UseImagePreview";


function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<ProductModel>();

    const navigate = useNavigate();

    async function send(product: ProductModel): Promise<void> {
        try {
            product.image = (product.image as unknown as FileList)[0];

            const beProduct = await productsService.addProduct(product);
            NotificationService.success("product added successfully");
            navigate("/products/product/" + beProduct.id);

        } catch (err: any) {
            NotificationService.error(err);
        }
    }



    const [imageFile, setImageFile] = useState<File | null>();
    const imageSrc = useImagePreview(imageFile);
    function handleChange(event: any) {
        const files = event.target.files;
        console.log(files);
        if (!files || !files.item(0)) return;

        setImageFile(files.item(0));
    }

    return (
        <div className="AddProduct">
            <h2>
                Add Product
            </h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Product name: </label><input type="text" {...register("name")} required placeholder="Chef Alexander's Pineapple Pizza" />
                <label>Product price: </label><input type="number" {...register("price")} required step="0.01" placeholder="69" />
                <label>Product stock: </label><input type="number" {...register("stock")} required placeholder="420" />

                <label>Product image: </label><input type="file" {...register("image")} accept="image/*" onChange={handleChange}/>
                <div className="imageContainer">
                    <img src={imageSrc} />
                </div>
                <button>Add product</button>
            </form>
        </div>
    );
}

export default AddProduct;
