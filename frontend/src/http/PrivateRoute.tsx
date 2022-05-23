import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Navigate, Outlet} from "react-router-dom";

function PrivateRoute (props: any) {
  const {store} = useContext(Context);
  return store.isAuth ? <Outlet /> : <Navigate to={"/auth/login"} />
}

export default observer(PrivateRoute);