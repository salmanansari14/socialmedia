import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { followAndUnfollowUser, getUserPosts, getUserProfile } from '../../Actions/User';
import { Avatar, Typography, Button, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert';
import Post from '../Post/Post';
import User from '../User/User';


const UserProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const { user, loading: userLoading, error: userError } = useSelector((state) => state.userProfile);
    const { user: me } = useSelector((state) => state.user);

    const { loading, error, posts } = useSelector((state) => state.userPosts);
    const { error: followError, message, loading: followLoading } = useSelector((state) => state.like);

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false)
    const [myProfile, setMyProfile] = useState(false)

    const followingHandler = () => {
        setFollowing(!following);
        dispatch(followAndUnfollowUser(user._id));
        dispatch(getUserProfile(params.id));
    }
    useEffect(() => {
        dispatch(getUserPosts(params.id));
        dispatch(getUserProfile(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (me._id === params.id) {
            setMyProfile(true);
            console.log("1")
        }
        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollowing(true);
                    console.log("2")
                }
                else {
                    setFollowing(false);
                    console.log("3")
                }
            });
        }
    }, [me._id, params.id]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (followError) {
            alert.error(followError);
            dispatch({ type: "clearErrors" })
        }
        if (userError) {
            alert.error(userError);
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [error, alert, followError, userError, message, dispatch]);

    return (loading === true || userLoading === true ? (
        <Loader />
    ) : <div className='account'>
        <div className="accountleft">
            {posts && posts.length > 0 ? (
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
                        isAccount = {"home"}
                        isDelete = {true}
                    />
                )
                )) : <Typography variant='h3'>User has not made any post</Typography>
            }
        </div>
        <div className="accountright">
            {user && (
                <> <Avatar src={user.avatar.url}
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
                    {

                        myProfile ? null :
                            <Button variant="contained" onClick={followingHandler} disabled={followLoading} style={{ background: following ? "red" : "" }}>
                                {following ? "Unfollow" : "Follow"}
                            </Button>
                    }
                </>
            )}
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
export default UserProfile