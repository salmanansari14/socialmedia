import React, { useState } from 'react'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import { Button, Typography } from '@mui/material';
import User from '../User/User';

const Search = () => {
    const [name, setName] = useState();
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.allUsers);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllUsers(name))
    }
    return (
        <div className='search'>
            <form className='searchForm' onSubmit={submitHandler}>

                <Typography variant="h3" style={{ padding: "2vmax"}}>Social Aap</Typography>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                    required
                />
                <Button disabled={loading} type="submit">Search</Button>
                <div className="searchResult">
                    {users && users.map((user) => (
                        <User
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    ))}
                </div>
            </form>
        </div>
    )
}

export default Search;