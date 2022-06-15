import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import {Typography} from "@mui/material";

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const {store} = useContext(Context);
	const history = useNavigate();

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
		>
			{/*<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"}/>*/}
			{/*<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"}/>*/}
			{/*<button onClick={() => store.login(email, password)}>Login</button>*/}
			{/*<button onClick={() => history("/auth/register")}>Register</button>*/}
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={() => store.login(email, password)}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs />
							<Grid item>
								<Link href="/auth/register" variant="body2">
									{"Don't have an account? Register"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</Grid>
	)
}

export default observer(LoginForm);
