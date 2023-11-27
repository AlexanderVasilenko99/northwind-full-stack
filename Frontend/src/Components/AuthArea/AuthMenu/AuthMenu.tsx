import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return unsubscribe;

    }, []);

    function logout(): void {
        authService.logout();
        noti.success("You have successfully logged out");
    }

    return (
        <div className="AuthMenu">

            {!user &&
                <p>

                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to={"/register/"}>Register</NavLink>
                    <span> | </span>
                    <NavLink to={"/login/"}>Login</NavLink>
                </p>
            }
            {user &&
                <p>
                    <span>Hello {user.firstName} {user.lastName}</span>
                    <span> | </span>
                    <NavLink to={"#"} onClick={logout}>Logout</NavLink>
                </p>
            }

        </div>
    );
}

export default AuthMenu;
