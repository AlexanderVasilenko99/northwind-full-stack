import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }
    // add validation schema and validate function
    private static validationSchema = Joi.object({

    })
}
export default UserModel;