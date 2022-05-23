import React, {useContext, useEffect} from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./http/PrivateRoute";
import TestComponent from "./components/TestComponent";
import PublicRoute from "./http/PublicRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import NotFound from "./components/errors/NotFound";
import {Context} from "./index";

function App() {
  const {store} = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {store.checkAuth()}
  }, [])
  return (
    <Routes>
      <Route path={"/"} element={<PrivateRoute />}>
        <Route path={"/"} element={<TestComponent />} />
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
