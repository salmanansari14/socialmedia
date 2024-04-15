import React, { useEffect, useState } from 'react'
import "./Register.css";
import { Avatar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { RegisterUser } from '../../Actions/User';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const alert = useAlert()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        };
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(RegisterUser(name, email, password, avatar))
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" })
        }
    }, [dispatch, error, alert]);
    return (
        <div className='register'>
            <form className='registerForm' onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>
                <Avatar
                    src={avatar}
                    alt='User'
                    sx={{ height: "10vmax", width: "10vmax" }}
                />
                <input className='registerInputs' type="file" accept='image/*'
                    onChange={handleImageChange} />
                <input className='registerInputs'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                />
                <input
                    type="email"
                    placeholder="Email"
                    className='registerInputs'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input type="password"
                    className='registerInputs'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Link to="/">
                    <Typography>
                        Already signed up? Login Now
                    </Typography>
                </Link>
                <Button disabled={loading} variant="contained" type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default Register