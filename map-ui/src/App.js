import React from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import TopBar from './Layout/topBar'
import {CssBaseline} from "@material-ui/core";
import {isAuthenticated} from "./Service/cache";
import LandingPage from "./LandingPage/landingPage";
import AppAuthenticated from "./appAuthenticated";
import MapTheme from "./Service/mapTheme";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  if (isAuthenticated()) {
    return (
        <AppAuthenticated/>
    );
  } else {
    return (
        <ThemeProvider theme={MapTheme('light')}>
          <div className={classes.root}>
            <CssBaseline/>
            <TopBar/>
            <LandingPage/>
          </div>
        </ThemeProvider>
    );
  }
}
