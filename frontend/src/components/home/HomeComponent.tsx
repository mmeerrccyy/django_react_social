import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Routes, Route, useNavigate, Outlet} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import ProfileComponent from "./profile/ProfileComponent";

function HomeComponent() {
  const {store} = useContext(Context);
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [])
  if (!store.isAuth) {
    history("/auth/login");
  }

  return (
    <>
      <HeaderComponent />
    </>
  )
}

export default observer(HomeComponent);
