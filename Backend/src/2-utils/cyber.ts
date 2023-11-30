import { Forbidden, Unauthorized } from "../3-models/error-models";
import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken"
import RoleModel from "../3-models/role-model";

class Cyber {
    private secretKey = "myverysecretsecretkey"
    public getNewToken(user: UserModel): string {
        // containing the user inside a container obj
        const container = { user };

        // creating expiration date
        const options = { expiresIn: "3h" };

        // creating a token
        const token = jwt.sign(container, this.secretKey, options)

        return token;
    }

    public verifyToken(token: string): void {
        if (!token) throw new Unauthorized("You are not logged in");
        try {
            jwt.verify(token, this.secretKey);
        } catch (err: any) {
            throw new Unauthorized(err.message);
        }
    }
    public verifyAdmin(token: string): void {
        this.verifyToken(token);
        // get container containing the user obj
        const container = jwt.verify(token, this.secretKey) as { user: UserModel };
        // extract user from container
        const user = container.user;
        if(user.roleId !== RoleModel.Admin) throw new Forbidden("You are not administrator")
    }


}
const cyber = new Cyber();
export default cyber;