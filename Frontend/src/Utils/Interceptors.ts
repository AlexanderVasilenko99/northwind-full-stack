import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    public create() {
        axios.interceptors.request.use(requestObject => {
            if (authStore.getState().token) {
                requestObject.headers.Authorization = `Bearer ${authStore.getState().token}`
            }
            return requestObject;
        });
    }
}
const interceptors = new Interceptors();
export default interceptors;