import React, { useEffect } from "react";
import "./Login.css"
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error } = useSelector((state) => state.user);
    const { message } = useSelector((state) => state.like);
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, dispatch]);
    return (
        <div className="login">
            <form action="" className="loginForm" onSubmit={loginHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input type="password"
                    placeholder="Passwordddddddddd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Link to="/forgot/password">
                    <Typography>
                        forgot password
                    </Typography>
                </Link>
                <Button variant="contained" type="submit">Login</Button>
                <Link to="/register">
                    <Typography>New User?</Typography>
                </Link>
            </form>
        </div>
    )
};
export default Login;