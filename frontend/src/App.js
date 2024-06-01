import './App.css';
import Header from "./Component/Header/Header"
import Home from "./Component/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Register from './Component/Register/Register';
import Account from './Component/Account/Account';
import NewPost from './Component/NewPost/NewPost';
import Search from './Component/Search/Search';
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
{/* "react-alert": "^7.0.3",
    "react-alert-template-basic": "^1.0.2", */}
    {/* "@mui/icons-material": "^5.14.3", */}
    {/* "@mui/material": "^5.14.3", */}
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
export default App;


// {
//   "name": "frontend",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "@emotion/react": "^11.11.1",
//     "@emotion/styled": "^11.11.0",
    
//     "@reduxjs/toolkit": "^1.9.5",
//     "@testing-library/jest-dom": "^5.17.0",
//     "@testing-library/react": "^13.4.0",
//     "@testing-library/user-event": "^13.5.0",
//     "axios": "^1.4.0",
//     "cloudinary": "^1.41.0",
//     "react": "^16.8.1",
//     "react-dom": "^18.2.0",
//     "react-redux": "^8.1.2",
//     "react-router-dom": "^6.14.2",
//     "react-scripts": "5.0.1",
//     "vercel": "^34.2.2",
//     "web-vitals": "^2.1.4"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   }
// }

