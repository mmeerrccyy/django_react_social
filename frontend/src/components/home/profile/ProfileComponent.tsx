import React, {useContext} from "react";
import {Context} from "../../../index";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

function ProfileComponent() {
  const {store} = useContext(Context);
  const {user_id} = useParams();
  const history = useNavigate();

  const getUserId = () => {
    console.log(user_id);
  }

  return (
    <>
      <h1>Profile page: {user_id}</h1>
      <button onClick={getUserId}>Button</button>
      <Outlet />
    </>
  )
}

export default ProfileComponent;