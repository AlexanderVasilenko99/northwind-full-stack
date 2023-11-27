import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";
import noti from "./NotificationService";

class AuthService {
    public async register(user: UserModel): Promise<void> {
        try {
            const response = await axios.post(appConfig.registerUrl, user);

            const token = response.data;

            const action: AuthAction = { type: AuthActionTypes.Register, payload: token }
            authStore.dispatch(action);

        } catch (err: any) { noti.error(err) }

    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);

        const token = response.data;

        const action: AuthAction = { type: AuthActionTypes.Login, payload: token }
        authStore.dispatch(action);
    }
    public logout(): void {
        const action: AuthAction = { type: AuthActionTypes.Logout }
        authStore.dispatch(action);
    }


}
const authService = new AuthService();
export default authService;