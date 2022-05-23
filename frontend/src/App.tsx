import React, {useContext, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./components/auth/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Routes, Route} from "react-router-dom";
import RegisterForm from "./components/auth/RegisterForm";

function App() {
  const {store} = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [])
  if (!store.isAuth) {
    return (
      <>
        <Routes>
          <Route path={"/login"}>
            <LoginForm/>
          </Route>
          <Route path={"/register"}>
            <RegisterForm/>
          </Route>
        </Routes>
      </>
    )
  }
  return (
    <div>
      {store.isAuth ? store.user.username : "Not logged in"}
      <button onClick={() => store.logout()}>Log out</button>
    </div>
  );
}

export default observer(App);
