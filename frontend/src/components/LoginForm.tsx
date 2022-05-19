import React, {FC, useContext, useState} from "react";
import {Context} from "../index";

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const {store} = useContext(Context);

	return (
		<div>
			<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"}/>
			<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"}/>
			<button onClick={() => store.login(email, password)}>Login</button>
			<button>Register</button>
		</div>
	)
}

export default LoginForm;
