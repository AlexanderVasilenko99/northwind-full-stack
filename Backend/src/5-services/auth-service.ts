// class AuthService{
//     public register(){

//     }
// }
// const authService = new AuthService();
// export default authService;
import { OkPacket } from 'mysql';
import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../3-models/credentials-model';
import { Unauthorized } from '../3-models/error-models';
import RoleModel from '../3-models/role-model';
import UserModel from '../3-models/user-model';
class AuthService {
    public async register(user: UserModel): Promise<string> {
        // Validate:
        // User.validate from model:

        // Is UserName taken:
        // if...

        // Declare user as regular user:
        user.roleId = RoleModel.User;


        // hash user password
        user.password = cyber.hashPassword(user.password);


        // Create sql:
        const sql = `INSERT INTO users(firstName, lastName, email, password, roleId) VALUES(?,?,?,?,?)`;
        //save user:
        const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

        // Add id to user
        user.id = info.insertId
        // Create token for user:
        const token = cyber.getNewToken(user);

        return token;
    }
    public async login(credentials: CredentialsModel): Promise<string> {
        // Validate:
        // User.validate from model:

        // hash password
        credentials.password = cyber.hashPassword(credentials.password);

        // Create sql:
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;


        const users = await dal.execute(sql,[credentials.email,credentials.password]);

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