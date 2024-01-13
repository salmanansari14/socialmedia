import React, { useEffect, useState } from 'react'
import './ResetPassword.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { resetPassword } from '../../Actions/User'
import { Link, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState()
    const { error, loading, message } = useSelector((state) => state.like);
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
         dispatch(resetPassword(params.token, newPassword));
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
        <div className="resetPassword">
            <form action="" className="resetPasswordForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>
                <input type="password"
                    className='resetPasswordInputs'
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Link to="/">
                    <Typography>Login</Typography>
                </Link>
                <Typography>Or</Typography>
                <Link to="/forgot/password">
                    <Typography>Request Another Token</Typography>
                </Link>
                <Button disabled= {loading}  variant="contained" type="submit">Reset Password</Button>
            </form>
        </div>
    )
}
export default ResetPassword;