import axios from "axios";
import Employee from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";
import { EmployeeActionTypes, EmployeeActions, employeeStore } from "../Redux/EmployeesState";

class EmployeeService {
    public async getAllEmployees(): Promise<Employee[]> {
        // const response = await axios.get(appConfig.employeesUrl);
        // const employees = response.data;

        let employees = employeeStore.getState().employees;
        if (employees.length === 0) {
            const response = await axios.get(appConfig.employeesUrl);
            employees = response.data;

            const action: EmployeeActions = { type: EmployeeActionTypes.SetEmployees, payload: employees }
            employeeStore.dispatch(action);
        }

        return employees;
    }

    public async addEmployee(employee: Employee): Promise<Employee> {
        const options = { headers: { "Content-Type": "multipart/form-data" } }

        const response = await axios.post(appConfig.employeesUrl, employee, options);
        const beEmployee = response.data;

        if (beEmployee.length > 0) {
            const action: EmployeeActions = { type: EmployeeActionTypes.AddEmployee, payload: beEmployee }
            employeeStore.dispatch(action);
        }


        return beEmployee;
    }

    public async deleteEmployee(employee: Employee): Promise<void> {
        await axios.delete(appConfig.employeesUrl + employee.id);

        const action: EmployeeActions = { type: EmployeeActionTypes.DeleteEmployee, payload: employee.id }
        employeeStore.dispatch(action);
    }


    public async updateEmployee(employee: Employee): Promise<Employee> {
        const options = { headers: { "Content-Type": "multipart/form-data" } }
        console.log(employee);
        
        const response = await axios.put(appConfig.employeesUrl + employee.id, employee, options);

        const updateEmployee = response.data;

        const action:EmployeeActions = {type:EmployeeActionTypes.EditEmployee,payload:updateEmployee}
        employeeStore.dispatch(action);
        
        return updateEmployee;
    }

    public async getOneEmployee(id: number) {
        console.log(id);

        const response = await axios.get(appConfig.employeesUrl + id);
        const employee = response.data;
        console.log(employee);
        
        return employee;
    }
}
const employeesService = new EmployeeService()
export default employeesService;