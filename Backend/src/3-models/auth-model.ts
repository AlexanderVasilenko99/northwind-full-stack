import { OkPacket } from "mysql";
import RoleModel from "./role-model";
import UserModel from "./user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";

class AuthModel {
    public async register(user: UserModel): Promise<string> {

        // validate
        user.roleId = RoleModel.User;
        const sql = `INSERT INTO users(firstName,lastName,email,password,roleId)
                        VALUES('${user.firstName}','${user.lastName}','${user.email}','${user.password}',${user.roleId})`
        const info: OkPacket = await dal.execute(sql);
        user.id = info.insertId;

        // create a token 
        const token = cyber.getNewToken(user);
        
        // return token
        return token;
    }
}
const authModel = new AuthModel();
export default authModel;