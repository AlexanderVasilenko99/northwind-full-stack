import { useEffect, useState } from "react";
import "./TotalEmployees.css";
import { employeeStore } from "../../../Redux/EmployeesState";
import employeesService from "../../../Services/EmployeesService";
import NotificationService from "../../../Services/NotificationService";

function TotalEmployees(): JSX.Element {


    const [count, setCount] = useState<number>(0);
    useEffect(() => {

        employeesService.getAllEmployees()
            .then(employees => {
                setCount(employees.length)
            })
            .catch((err: any) => NotificationService.error(err))

        const unsubscribe = employeeStore.subscribe(() => {
            setCount(employeeStore.getState().employees.length)
        });
        return unsubscribe;
    }, [])

    employeeStore.subscribe(() => {
        setCount(employeeStore.getState().employees.length)
    });


    return (
        <div className="TotalEmployees">
            <p>Total Employees: {count}</p>
        </div>
    );
}

export default TotalEmployees;
