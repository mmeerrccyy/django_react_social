import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

function TestComponent() {
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
      {store.isAuth ? store.user.username : "Not logged in"}
      <button onClick={() => store.logout()}>Log out</button>
    </>
  )
}

export default observer(TestComponent);
