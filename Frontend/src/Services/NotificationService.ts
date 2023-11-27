import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

class NotificationService {

    private notificationService = new Notyf({
        duration: 4000,
        position: { x: `center`, y: `top` }
    });

    public success(message: string): void {
        this.notificationService.success(message);
    }
    public error(err: any): void {
        const msg = this.extractErrorMessage(err);
        this.notificationService.error(msg);
    }

    private extractErrorMessage(err: any) {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response?.data; // for axios
        if (Array.isArray(err.response?.data)) return err.response?.data[0]; // for axios
        if (typeof err.message === "string") return err.message;

    }
}
const noti = new NotificationService;
export default noti;