import { useForm } from "react-hook-form";
import "./AddEmployee.css";
import Employee from "../../../Models/EmployeeModel";
import employeesService from "../../../Services/EmployeesService";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../../Services/NotificationService";
import useImagePreview from "../../../Utils/UseImagePreview";
import { useState } from "react";

function AddEmployee(): JSX.Element {

    const { register, handleSubmit } = useForm<Employee>();
    const navigate = useNavigate();



    // insert custom hook here


    async function addEmployee(employee: Employee): Promise<void> {
        employee.image = (employee.image as unknown as FileList)[0];

        const beEmployee = await employeesService.addEmployee(employee);
        console.log(beEmployee);

        NotificationService.success(`Successfully added ${beEmployee.firstName} ${beEmployee.lastName} as employee #${beEmployee.id}`);
        navigate("/Employees/");
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
        <div className="AddEmployee">
            <form onSubmit={handleSubmit(addEmployee)}>
                <label>First name: </label><input type="text" {...register("firstName")} />
                <label>Last name: </label><input type="text" {...register("lastName")} />
                <label>Title: </label><input type="text" {...register("title")} />
                <label>Country: </label><input type="text" {...register("country")} />
                <label>City: </label><input type="text" {...register("city")} />
                <label>Birth date: </label><input type="date" {...register("birthDate")} />

                <input type="file" accept="image/*" {...register("image")} onChange={handleChange} />
                <div className="imageContainer">
                    <img src={imageSrc} />
                </div>
                <button>Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;
