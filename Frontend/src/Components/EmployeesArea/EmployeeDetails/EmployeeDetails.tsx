import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Employee from "../../../Models/EmployeeModel";
import employeesService from "../../../Services/EmployeesService";
import appConfig from "../../../Utils/AppConfig";
import "./EmployeeDetails.css";
import NotificationService from "../../../Services/NotificationService";

function EmployeeDetails(): JSX.Element {

    const [feEmployee, setFeEmployee] = useState<Employee>();
    const params = useParams();
    const navigate = useNavigate()

    const id = +params.eId;
    console.log(id);

    useEffect(() => {
        employeesService.getOneEmployee(id)
            .then(beEmployee => setFeEmployee(beEmployee))
            .catch(err => console.log(err))
    }, [])


    async function deleteUser() {
        try {

            await employeesService.deleteEmployee(feEmployee);
            NotificationService.success(`employee #${id} has been deleted successfully`);
            navigate(`/employees`)
        }
        catch (err:any) { NotificationService.error(err) };
    }

    return (

        <div key={feEmployee?.id} className="EmployeeCard">
            <img src={appConfig.employeesUrl + feEmployee?.imageName} alt="" />
            ID: {feEmployee?.id} <br />
            Full name: {feEmployee?.firstName} {feEmployee?.lastName} <br />
            Position: {feEmployee?.title} <br />
            Address: {feEmployee?.country} {feEmployee?.city}
            <div>

                <NavLink to={`/employees/`}>back</NavLink>
                |
                <NavLink to={`/employees/edit/${feEmployee?.id}`}>edit</NavLink>
                |
                <NavLink to={`#`} onClick={deleteUser}>delete</NavLink>
            </div>
        </div>
    );
}

export default EmployeeDetails;
