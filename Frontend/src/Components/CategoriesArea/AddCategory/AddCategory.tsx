import { useForm } from "react-hook-form";
import "./AddCategory.css";
import CategoriesModel from "../../../Models/CategoriesModel";
import { useState } from "react";
import useImagePreview from "../../../Utils/UseImagePreview";
import categoryServices from "../../../Services/CategoriesServices";
import noti from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function AddCategory(): JSX.Element {

    const { register, handleSubmit, } = useForm<CategoriesModel>();
    const navigate = useNavigate();


    async function send(category: CategoriesModel) {
        try {
            category.image = (category.image as unknown as FileList)[0];
            console.log(category);

            const beCategory: CategoriesModel = await categoryServices.addCategory(category);
            noti.success(`category ${beCategory.name} has been added successfully as category #${beCategory.id}`)
            navigate('/categories/')
        }
        catch (err: any) { noti.error(err) }
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
        <div className="AddCategory">
            <h2>
                Add Category
            </h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Category Name:</label>
                <input type="text" {...register("name")} />
                <label>Category Description:</label>
                <input type="text" {...register("description")} />
                <label>Category image:</label>
                <input type="file" accept="image/*" {...register("image")} onChange={handleChange} />
                <div>
                    <img src={imageSrc} />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategory;
