import axios from "axios";
// const a = "https://socialmedd.onrender.com/"
const a = "https://socialmedia-qqif.vercel.app/"
// const a = ""
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });
        const { data } = await axios.post(
            `${a}api/v1/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });
    }
    catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        });
    }
};

export const LogoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest",
        });
        const { data } = await axios.get(`${a}api/v1/logout`)
        dispatch({
            type: "LogoutUserSuccess",
            payload: data.user,
        });
    }
    catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error,
        });
    }
};
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const { data } = await axios.get(`api/v1/me`);
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    }
    catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "postOfFollowingRequest",
        });

        const { data } = await axios.get(`${a}api/v1/posts`);
        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,

        });
    }
};
export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostsRequest",
        });

        const { data } = await axios.get(`api/v1/my/posts`);
        dispatch({
            type: "myPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "myPostsFailure",
            payload: error.response.data.message,

        });
    }
};
export const getAllUsers = (name = "") => async (dispatch) => {
    try {
        dispatch({
            type: "allUsersRequest",
        });

        const { data } = await axios.get(`${a}api/v1/users?name=${name}`);
        dispatch({
            type: "allUsersSuccess",
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: "allUsersFailure",
            payload: error.response.data.message,

        });
    }
};

export const RegisterUser = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest",
        });
        const { data } = await axios.post(
            `${a}api/v1/register`,
            { name, email, password, avatar },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            console.log(avatar)
        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        });
    }
    catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error,
        });
    }
};

export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });
        const { data } = await axios.put(
            `${a}api/v1/update/profile`,
            { name, email, avatar },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        });
    }
    catch (error) {
        dispatch({
            type: "updateProfileFailure",
            payload: error,
        });
    }
};

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePasswordRequest",
        });
        const { data } = await axios.put(
            `${a}api/v1/update/password`,
            { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message,
        });
    }
    catch (error) {
        dispatch({
            type: "updatePasswordFailure",
            payload: error,
        });
    }
};

export const deleteMyProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest",
        });
        const { data } = await axios.delete(`${a}api/v1/delete/me`);
        dispatch({
            type: "deleteProfileSuccess",
            payload: data.message,
        });
    }
    catch (error) {
        dispatch({
            type: "deleteProfileFailure",
            payload: error,
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest",
        });
        const { data } = await axios.post(`${a}api/v1/forgot/password`, {
            email,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        dispatch({
            type: "forgotPasswordSuccess",
            payload: data.message,
        });
    }
    catch (error) {
        dispatch({
            type: "forgotPasswordFailure",
            payload: error,
        });
    }
};
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest",
        });
        const { data } = await axios.put(`${a}api/v1/password/reset/${token}`, {
            password,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message,
        });
    }
    catch (error) {
        dispatch({
            type: "resetPasswordFailure",
            payload: error.response.data.message,
        });

    }
};

export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userPostsRequest",
        });
        const { data } = await axios.get(`/api/v1/userposts/${id}`);
        dispatch({
            type: "userPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message,

        });
    }
};

export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest",
        });
        const { data } = await axios.get(`/api/v1/user/${id}`);
        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,

        });
    }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "followUserRequest",
        });
        const { data } = await axios.get(`api/v1/follow/${id}`);
        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,

        });
    }
};