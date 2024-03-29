import React, { useEffect, useState } from 'react'
import "./UpdateProfile.css";
import { Avatar, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { RegisterUser, loadUser } from '../../Actions/User';
import { updateProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';



const UpdateProfile = () => {

    const { loading, error, user } = useSelector((state) => state.user);
    const {
        loading: updateLoading,
        error: updateError,
        message,
    } = useSelector((state) => state.like)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);


    const dispatch = useDispatch();
    const alert = useAlert()

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result)
            }
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar))
        dispatch(loadUser());
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" })
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearErrors" })
        }
    }, [dispatch, error, alert, updateError, message]);
    return (
        loading ? <Loader /> : (
            <div className='register'>
                <form className='registerForm' onSubmit={submitHandler}>
                    <Typography variant="h3" style={{ padding: "2vmax" }}>Social Aap</Typography>
                    <Avatar
                        src={avatarPrev}
                        alt='User'
                        sx={{ height: "10vmax", width: "10vmax" }}
                    />
                    <input className='UpdateProfileInputs' type="file" accept='image/*'
                        onChange={handleImageChange} />
                    <input className='updateProfileInputs'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className='updateProfileInputs'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <Button disabled={updateLoading} variant="contained" type="submit">Update</Button>
                </form>
            </div>
        )
    );
}

export default UpdateProfile;