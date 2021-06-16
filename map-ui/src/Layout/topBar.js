import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {drawerToggle, drawerWidth, isAuthenticated} from "../Service/cache";
import {keycloak} from "../keycloak";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

export default function TopBar() {
  const classes = useStyles();

  const handleDrawerToggle = () => {
    drawerToggle() ? drawerToggle(false) : drawerToggle(true);
  };

  if (isAuthenticated()) {
    return (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <CssBaseline/>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Meta Agile Process Model
            </Typography>
            <Button color="inherit"
                    onClick={() => {
                      keycloak.logout();
                    }}
            >Logout</Button>
          </Toolbar>
        </AppBar>
    );
  }

  return (
      <AppBar position="static">
        <Toolbar>
          <CssBaseline/>
          <Typography variant="h6" className={classes.title}>
            Meta Agile Process Model
          </Typography>
          <Button color="inherit"
                  onClick={() => {
                    keycloak.login()
                  }}
          >Login</Button>
        </Toolbar>
      </AppBar>
  );
}