import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {drawerWidth} from "../Service/cache";
import DashboardHero from "./dashboardHero";
import DashboardGrid from "./dashboardGrid";

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
}));

export default function DashboardPage() {
  const classes = useStyles();

  return (
      <div className={classes.content}>
        <DashboardHero/>
        <DashboardGrid/>
      </div>
  );
}