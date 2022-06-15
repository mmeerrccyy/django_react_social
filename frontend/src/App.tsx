import React, {useContext, useEffect} from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import {Outlet, Route, Routes} from "react-router-dom";
import PrivateRoute from "./http/PrivateRoute";
import TestComponent from "./components/home/HomeComponent";
import PublicRoute from "./http/PublicRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import NotFound from "./components/errors/NotFound";
import {Context} from "./index";
import ProfileComponent from "./components/home/profile/ProfileComponent";
import MyProfileComponent from "./components/home/profile/MyProfileComponent";

function App() {
  const {store} = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) store.checkAuth()
  }, [])
  return (
    <Routes>
      <Route path={"/"} element={<PrivateRoute />}>
        <Route index element={<MyProfileComponent />} />
        <Route path={"profile/:user_id"} element={<ProfileComponent />}/>
      </Route>
      <Route path={"auth"} element={<PublicRoute />}>
        <Route path={"login"} element={<LoginForm />} />
        <Route path={"register"} element={<RegisterForm />} />
      </Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
}

export default observer(App);
