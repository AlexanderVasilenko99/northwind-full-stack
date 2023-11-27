// class AuthService{
//     public register(){

//     }
// }
// const authService = new AuthService();
// export default authService;




import { OkPacket } from 'mysql';
import UserModel from '../3-models/user-model';
import dal from '../2-utils/dal';
import RoleModel from '../3-models/role-model';
import { ResourceNotFound, Unauthorized } from '../3-models/error-models';
import cyber from '../2-utils/cyber';
import CredentialsModel from '../3-models/credentials-model';

class AuthService {
    public async register(user: UserModel): Promise<string> {
        // Validate:
        // User.validate from model:

        // Is UserName taken:
        // if...

        // Declare user as regular user:
        user.roleId = RoleModel.User;

        // Create sql:
        const sql = `INSERT INTO users(firstName, lastName, email, password, roleId)
                     VALUES('${user.firstName}','${user.lastName}','${user.email}','${user.password}', ${user.roleId})`;
        //save user:
        const info: OkPacket = await dal.execute(sql);
        // Add id to user
        user.id = info.insertId
        // Create token for user:
        const token = cyber.getNewToken(user);

        return token;
    }
    public async login(credentials: CredentialsModel): Promise<string> {
        // Validate:
        // User.validate from model:


        // Create sql:
        const sql = `SELECT * FROM users
                    WHERE email = '${credentials.email}' AND
                    password = '${credentials.password}'`;


        const users = await dal.execute(sql);

        // getSingleUser
        const user = users[0];

        if (!user) throw new Unauthorized("Incorrect email/password");

        // Create token for user:
        const token = cyber.getNewToken(user);

        return token;
    }
}

const authService = new AuthService();
export default authService;