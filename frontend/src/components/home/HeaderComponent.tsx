import React, {useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {Context} from "../../index";
import {Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {Outlet, useNavigate} from "react-router-dom";
import {AccountCircle} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";


function HeaderComponent() {
  const {store} = useContext(Context)
  const history = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <AppBar position={"static"}>
          <Toolbar>
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs>
                <Typography variant={"h6"} component={"div"} sx={{flexGrow: 1}} onClick={() => history("/")}>
                  Django React Social
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant={"h6"} component={"div"} onClick={handleMenu} align={"right"}>
                  {store.user.username}
                </Typography>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => history("/")}>My Profile</MenuItem>
                  <MenuItem onClick={() => store.logout()}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Outlet/>
      </Box>
    </>
  )
}

export default observer(HeaderComponent);
