import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Navigate, Outlet} from "react-router-dom";

function PublicRoute (props: any) {
  const {store} = useContext(Context);
  useEffect(() => {
    if (!store.isAuth) {store.checkAuth()}
  }, [])
  return store.isAuth ? <Navigate to={"/"} /> : <Outlet />;
}

export default observer(PublicRoute)
