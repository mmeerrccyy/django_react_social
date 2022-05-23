import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const {store} = useContext(Context);
	const history = useNavigate();

	return (
		<div>
			<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"}/>
			<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"}/>
			<button onClick={() => store.login(email, password)}>Login</button>
			<button onClick={() => history("/register")}>Register</button>
		</div>
	)
}

export default observer(LoginForm);
