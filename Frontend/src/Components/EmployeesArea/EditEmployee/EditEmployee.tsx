import { useNavigate, useParams } from "react-router-dom";
import "./EditEmployee.css";
import { useForm } from "react-hook-form";
import Employee from "../../../Models/EmployeeModel";
import employeesService from "../../../Services/EmployeesService";
import { useEffect, useState } from "react";
import appConfig from "../../../Utils/AppConfig";
import NotificationService from "../../../Services/NotificationService";

function EditEmployee(): JSX.Element {

    const params = useParams();
    const id = +params.eId;

    const { register, handleSubmit, setValue } = useForm<Employee>();
    const navigate = useNavigate();

    const [imgSrc, setImgSrc] = useState<string>(`https://rockwellagency.com/wp-content/uploads/2016/10/employee_default1.png`);


    useEffect(() => {
        employeesService.getOneEmployee(id)
            .then(e => {
                setValue("firstName", e.firstName);
                setValue("id", e.id);
                setValue("lastName", e.lastName);
                setValue("title", e.title);
                setValue("country", e.country);
                setValue("city", e.city);
                setValue("birthDate", e.birthDate);
                setImgSrc(appConfig.employeesUrl + e.imageName)
            })
            .catch((err) => NotificationService.error(err))
    }, []);

    async function updateEmployee(employee: Employee): Promise<void> {
        try {
            employee.image = (employee.image as unknown as FileList)[0];

            const beEmployee = await employeesService.updateEmployee(employee);

            NotificationService.success(`Successfully Updated ${beEmployee.firstName} ${beEmployee.lastName}`);
            navigate("/Employees/");
        }
        catch (err: any) { NotificationService.error(err) }
    }

    function handleChange(e: any) {
        const file = (e.target.files)[0];
        const url = URL.createObjectURL(file);
        setImgSrc(url);

    }

    return (
        <div className="EditEmployee">
            <form onSubmit={handleSubmit(updateEmployee)}>
                <label>First name: </label><input type="text" {...register("firstName")} />
                <label>Last name: </label><input type="text" {...register("lastName")} />
                <label>Title: </label><input type="text" {...register("title")} />
                <label>Country: </label><input type="text" {...register("country")} />
                <label>City: </label><input type="text" {...register("city")} />
                <label>Birth date: </label><input type="date" {...register("birthDate")} />

                <input type="file" accept="image/*" {...register("image")} onChange={handleChange} />
                <div className="imageContainer">
                    <img src={imgSrc} alt="nope" />
                </div>
                <button>Edit Employee</button>
            </form>
        </div>
    );
}

export default EditEmployee;
