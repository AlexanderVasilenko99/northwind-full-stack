import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import EmployeeModel from "../3-models/employee-model";
import { ResourceNotFound } from "../3-models/error-models";
import {fileSaver} from "uploaded-file-saver"
class EmployeeService {

    public async getAllEmployees(): Promise<EmployeeModel[]> {
        const sql = `SELECT
                        EmployeeID as id,
                        FirstName as firstName,
                        LastName as lastName,
                        DATE(BirthDate) as birthDate,
                        Country as country,
                        City as city
                    FROM employees`;
        const employees = await dal.execute(sql);
        return employees;
    }

    public async getOneEmployee(id: number): Promise<EmployeeModel> {
        const sql = `SELECT
                        EmployeeID as id,
                        FirstName as firstName,
                        LastName as lastName,
                        DATE(BirthDate) as birthDate,
                        Country as country,
                        City as city
                    FROM employees
                    WHERE EmployeeID = ${id}`;
        const employee = await dal.execute(sql);
        return employee;
    }

    public async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
        employee.addEmployeeValidate();
        const bday = new Date(employee.birthDate)
        const d = bday.getDate();
        const m = bday.getMonth();
        const y = bday.getFullYear();

        const imageName = await fileSaver.add(employee.image);

        const sql = `INSERT INTO employees(LastName,FirstName,BirthDate,City,Country,ImageName)
                        values('${employee.lastName}',
                            '${employee.firstName}',
                            '${y}-${m}-${d}',
                            '${employee.city}',
                            '${employee.country}',
                            '${imageName}');`;

        const info: OkPacket = await dal.execute(sql);
        employee.employeeID = info.insertId;

        employee.imageUrl = appConfig.appHost + "/api/employees/" + imageName;
        delete employee.image;

        return employee;
    }

    public async editEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
        const existingImageName = await this.getExistingImageName(employee.employeeID);
        employee.imageUrl = existingImageName;
        employee.editEmployeeValidate();
        const newImageName = await fileSaver.update(existingImageName,employee.image);
        employee.imageUrl = employee.image ? newImageName : existingImageName;


        const bday = new Date(employee.birthDate)
        const d = bday.getDate();
        const m = bday.getMonth();
        const y = bday.getFullYear();

        const sql = `UPDATE employees SET
                        LastName = '${employee.lastName}',
                        FirstName = '${employee.firstName}',
                        BirthDate = '${y}-${m}-${d}',
                        City = '${employee.city}',
                        Country = '${employee.country}',
                        ImageName = '${employee.imageUrl}'
                    WHERE EmployeeID = ${employee.employeeID}`;

        const info: OkPacket = await dal.execute(sql);
        delete employee.image;
        fileSaver.delete(existingImageName)
        if (info.affectedRows === 0) throw new ResourceNotFound(employee.employeeID);
        return employee;
    }

    private async getExistingImageName(id: number): Promise<string> {
        const sql = `SELECT ImageName FROM employees WHERE EmployeeID = ${id}`;
        const employees = await dal.execute(sql);

        const employee = employees[0];

        if (!employee) return "";
        return employee.ImageName;
    }

    public async deleteEmployee(id: number): Promise<void> {
        const existingImageName = await this.getExistingImageName(id);
        const sql = `DELETE FROM employees WHERE EmployeeID = ${id}`;

        const info: OkPacket = await dal.execute(sql);

        fileSaver.delete(existingImageName);

        if (info.affectedRows === 0) throw new ResourceNotFound(id);
    }
}
const employeeService = new EmployeeService()
export default employeeService;