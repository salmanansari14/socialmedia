import React, { useEffect, useState } from 'react'
import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUser, deleteMyProfile, getMyPosts, loadUser } from '../../Actions/User';
import Loader from '../Loader/Loader'
import { Avatar, Typography, Button, Dialog } from '@mui/material';
import { Link } from 'react-router-dom'
import Post from '../Post/Post';
import { useAlert } from 'react-alert';
import User from '../User/User';


const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message, loading:deleteLoading } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(LogoutUser());
    alert.success("Logged out successfully")
  }

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(loadUser());
  }

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({type: "clearErrors"})
    }
    if (message) {
      alert.error(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return (loading === true || userLoading === true ? (
    <Loader />
  ) :
    <div className='account'>
      <div className="accountleft">
        {
          posts && posts.length > 0 ? (
            posts.map(post => (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                ownerImage={post.owner.avatar.url}
                isAccount={true}
                isDelete={true}
              />
            )
            )) : <Typography variant='h3'>you have not made any post</Typography>
        }
      </div>
      <div className="accountright">
        <Avatar src={user && user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }} />
        <Typography variant='h5'>{user.name}</Typography>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>followers</Typography>
            <Typography>{user.followers.length}</Typography>
          </button>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>following</Typography>
            <Typography>{user.following.length}</Typography>
          </button>
        </div>
        <div>
          <Typography>Post</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>Logout</Button>

        <Link to="/update/profile">Edit profile</Link>
        <Link to="/update/password">Update password</Link>

        <Button disabled={deleteLoading} variant='text' style={{color:"red", margin: "2vmax"}} onClick={deleteProfileHandler}>
          Delete my profile
        </Button>
      </div>

      <Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Followed by</Typography>
          {
            user && user.followers.length > 0 ? user.followers.map((follower) => (
              <User
                key={follower._id}
                userId={follower._id}
                name={follower.name}
                avatar={follower && follower.avatar.url}
              />
            )) : <Typography style={{ margin: "2vmax" }}>You have no follower</Typography>
          }
        </div>
      </Dialog>

      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Following</Typography>
          {
            user && user.following.length > 0 ? user.following.map((following) => (
              <User
                key={following._id}
                userId={following._id}
                name={following.name}
                avatar={following && following.avatar.url}
              />
            )) : <Typography style={{ margin: "2vmax" }}>You have no follower</Typography>
          }
        </div>
      </Dialog>
    </div>
  );
};

export default Account