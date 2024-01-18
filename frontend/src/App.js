import './App.css';
import Header from "./Component/Header/Header"
import Home from "./Component/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Account from './Component/Account/Account';
import Search from './Component/Search/Search';
import NewPost from './Component/NewPost/NewPost';
import Register from './Component/Register/Register';
import UpdateProfile from './Component/UpdateProfile/UpdateProfile';
import UpdatePassword from './Component/UpdatePassword/UpdatePassword';
import ForgotPassword from './Component/FogotPassword/ForgotPassword';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import UserProfile from './Component/UserProfile/UserProfile';
import NotFound from './Component/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route
          path="/" element={isAuthenticated ? <Home /> : <Login />}
        />
        
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />

        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />
        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route
          path="search"
          element={<Search />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false && npm install --prefix frontend && npm run build --prefix frontend"
// "start": "nodemon backend/server.js",
export default App;
