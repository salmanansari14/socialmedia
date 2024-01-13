import React, { useEffect } from 'react'
import "./UpdatePassword.css"
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useAlert } from 'react-alert';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const{error, loading, message} = useSelector((state)=> state.like);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword))
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearErrors" })
        }
    }, [dispatch, error, alert, message]);
    return (
        <div className="updatePassword">
            <form action="" className="updatePasswordForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>

                <input type="password"
                    className='updatePasswordInputs'
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <input type="password"
                    className='updatePasswordInputs'
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Button disabled={loading} variant="contained" type="submit">Change Password</Button>
            </form>
        </div>
    )
};

export default UpdatePassword