import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState<string>("");
  const {store} = useContext(Context);
  const history = useNavigate()

  return (
    <>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"}/>
      <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder={"Username"}/>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"}/>
      <input type="password" onChange={(e) => setRePassword(e.target.value)} value={repassword} placeholder={"Repeat password"}/>
      <button onClick={() => store.register(email, username, password, repassword)}>Register</button>
      <button onClick={() => history("/")}>Login</button>
    </>
  )
}

export default observer(RegisterForm);