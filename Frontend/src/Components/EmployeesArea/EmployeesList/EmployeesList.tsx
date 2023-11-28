import { useEffect, useState } from "react";
import EmployeeModel from "../../../Models/EmployeeModel";
import EmployeeService from "../../../Services/EmployeesService";
import Utils from "../../../Utils/AppConfig";
import UseTitle from "../../../Utils/UseTitle";
import "./EmployeesList.css";
import { NavLink } from "react-router-dom";
import addIcon from "../../../Assets/Images/addIcon3.png"
import deleteIcon from "../../../Assets/Images/trashcan.png"
import { EmployeeActionTypes, EmployeeActions, employeeStore } from "../../../Redux/EmployeesState";

function EmployeesList(): JSX.Element {
    UseTitle("NorthWind | Employees");
    // usestate
    const [feEmployees, setFeEmployees] = useState<EmployeeModel[]>();
    // useefect to fetch only once
    useEffect(() => {
        EmployeeService.getAllEmployees()
            .then(e => setFeEmployees(e))
            .catch(err => console.log(err))
    }, []);

    function clearEmployees(){
        const action:EmployeeActions = {type:EmployeeActionTypes.ClearEmployees}
        employeeStore.dispatch(action);
    }

    return (
        // feEmployees.length === 0 ? <h2>No employees yet, sry</h2> :
        <div className="EmployeesList">
            <div className="buttons">
                <NavLink to={"/employees/new/"}><img src={addIcon}/></NavLink>
                <NavLink to={'/home/'} onClick={clearEmployees}> <img src={deleteIcon}/> </NavLink>
            </div>
            {/* don't forget this fucker ---> `?` */}
            {feEmployees?.map((e) =>
                <NavLink key={e?.id} to={`employee/${e?.id}`}>
                    <div key={e?.id} className="EmployeeCard">
                        <img src={Utils.employeesUrl + e?.imageName} alt="" />
                        ID: {e?.id} <br />
                        Full name: {e.firstName} {e?.lastName} <br />
                        Position: {e?.title} <br />
                        Address: {e?.country} {e?.city}
                    </div>
                </NavLink>


            )}

        </div >
    );
}

export default EmployeesList;
