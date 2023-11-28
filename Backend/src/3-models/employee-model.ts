import Joi, { IsNonPrimitiveSubsetUnion, object } from "joi"
import { ResourceNotFound, Validation } from "./error-models";
import { UploadedFile } from "express-fileupload";
class EmployeeModel {
    public employeeID: number;
    public firstName: string;
    public lastName: string;
    public birthDate: Date;
    public country: string;
    public city: string;
    public image: UploadedFile;
    public imageUrl: string;

    constructor(employee: EmployeeModel) {
        this.employeeID = employee.employeeID;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.birthDate = employee.birthDate;
        this.country = employee.country;
        this.city = employee.city;
        this.image = employee.image;
        this.imageUrl = employee.imageUrl;
    }
    private static addValidationSchema = Joi.object({
        employeeID: Joi.number().forbidden(),
        firstName: Joi.string().required().max(10).min(2),
        lastName: Joi.string().required().max(20).min(2),
        birthDate: Joi.date().required(),
        country: Joi.string().required().max(15).min(2),
        city: Joi.string().required().max(15).min(2),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().min(2).max(200)
    })
    private static editValidationSchema = Joi.object({
        employeeID: Joi.number().required().positive().integer().less(1000000000),
        firstName: Joi.string().required().max(10).min(2),
        lastName: Joi.string().required().max(20).min(2),
        birthDate: Joi.date().required(),
        country: Joi.string().required().max(15).min(2),
        city: Joi.string().required().max(15).min(2),
        image: Joi.object().optional(),
        imageUrl: Joi.string().required().min(2).max(200)
    })
    public addEmployeeValidate(): void {
        const result = EmployeeModel.addValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
        if (this.image.size > 1000000) throw new Validation("image file too large");
    }
    public editEmployeeValidate(): void {
        const result = EmployeeModel.editValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
        if (this.image?.size > 1000000) throw new Validation("image file too large");
    }
}
export default EmployeeModel;