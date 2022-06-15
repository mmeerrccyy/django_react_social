import React, {FC, useContext, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState<string>("");
  const {store} = useContext(Context);
  const history = useNavigate()

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
      {/*<input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder={"Username"}/>*/}
      {/*<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"}/>*/}
      {/*<input type="password" onChange={(e) => setRePassword(e.target.value)} value={repassword} placeholder={"Repeat password"}/>*/}
      {/*<button onClick={() => store.register(email, username, password, repassword)}>Register</button>*/}
      {/*<button onClick={() => history("/auth/login")}>Login</button>*/}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="repassword"
              label="Repeat password"
              type="password"
              id="repassword"
              onChange={(e) => setRePassword(e.target.value)}
              value={repassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => store.register(email, username, password, repassword)}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  {"Have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  )
}

export default observer(RegisterForm);