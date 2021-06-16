import React from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import TopBar from './Layout/topBar'
import {useQuery} from "@apollo/client";
import {userId, userName} from "./Service/cache";
import DrawerLayout from "./Layout/drawerLayout";
import Router from "./Service/router";
import {GET_DARKMODE} from "./Service/queryService";
import MapTheme from "./Service/mapTheme";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AppAuthenticated() {
  const classes = useStyles();

  const {loading, error, data} = useQuery(GET_DARKMODE, {
    variables: {id: userId(), userName: userName()}
  });

  if (loading) {
    return null;
  }
  if (error) {
    return `Error! ${error}`;
  }

  return (
      <ThemeProvider
          theme={MapTheme(data.getPerson.darkModeOn ? 'dark' : 'light')}>
        <div className={classes.root}>
          <TopBar/>
          <DrawerLayout/>
          <Router/>
        </div>
      </ThemeProvider>
  );
}
