import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css";
import { Button, Typography } from '@mui/material';
import { forgotPassword } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, message} = useSelector((state)=> state.like)
    const [email, setEmail] = useState("")
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email))
    }
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
        <div className="forgotPassword">
            <form action="" className="forgotPasswordForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>
                <input
                    type="email"
                    placeholder="Email"
                    className='forgotPasswordInputs'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <Button disabled={loading} variant="contained" type="submit">Send Token</Button>
            </form>
        </div>
    )
}

export default ForgotPassword