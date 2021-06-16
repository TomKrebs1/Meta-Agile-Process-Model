import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {drawerToggle, drawerWidth} from "../Service/cache";
import {useReactiveVar} from "@apollo/client";
import DrawerContent from "./drawerContent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth(),
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth(),
  },
}));

export default function DrawerLayout() {
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    drawerToggle() ? drawerToggle(false) : drawerToggle(
        true);
  };

  const toggleDrawer = useReactiveVar(drawerToggle);

  return (
      <div className={classes.root}>
        <CssBaseline/>
        <nav className={classes.drawer}>
          <Hidden lgUp>
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={toggleDrawer}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
            >
              <DrawerContent/>
            </Drawer>
          </Hidden>
          <Hidden mdDown>
            <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
              <DrawerContent/>
            </Drawer>
          </Hidden>
        </nav>
      </div>
  );
}
