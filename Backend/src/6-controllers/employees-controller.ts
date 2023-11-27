import express, { NextFunction, Request, Response } from "express";
import employeeService from "../5-services/employee-service";
import StatusCode from "../3-models/status-codes";
import EmployeeModel from "../3-models/employee-model";
import path from "path"
const router = express.Router();

// GET https://localhost:4000/api/employees
router.get("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees = await employeeService.getAllEmployees();
        response.json(employees);
    } catch (err: any) {
        next(err);
    }
})
router.get("/employees/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const employee = await employeeService.getOneEmployee(id);
        response.json(employee[0]);
    } catch (err: any) {
        next(err);
    }
})
router.post("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        request.body.image = request.files?.image;
        const employee = new EmployeeModel(request.body);

        const returnedEmployee = await employeeService.addEmployee(employee);
        response.status(StatusCode.Created).json(returnedEmployee);
    } catch (err: any) {
        next(err);
    }
})
router.put("/employees/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.employeeID = +request.params.id;
        request.body.image = request.files?.image;
        const employee = new EmployeeModel(request.body);
        
        const returnedEmployee = await employeeService.editEmployee(employee);
        response.json(returnedEmployee);
    } catch (err: any) {
        next(err);
    }
})
router.delete("/employees/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;

        const returnedEmployee = await employeeService.deleteEmployee(id);
        response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
        next(err);
    }
})
router.get("/employees/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
})

export default router;