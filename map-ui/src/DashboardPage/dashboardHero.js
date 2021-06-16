import {makeStyles} from "@material-ui/core/styles";
import {
  dialogBoolean,
  dialogContext,
  drawerWidth,
  userName
} from "../Service/cache";
import Typography from "@material-ui/core/Typography";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import React from "react";
import DashboardCreateTeam from "./dashboardCreateTeam";
import DashboardJoinTeam from "./dashboardJoinTeam";

const useStyles = makeStyles((theme) => ({
  hero: {
    padding: theme.spacing(8, 0, 4, 0),
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(0, 0, 6, 0),
  },
  fab: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
  },
  dialog: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
}));

export default function DashboardHero() {
  const classes = useStyles();

  const handleOpenJoin = () => {
    dialogBoolean(true);
    dialogContext('joinTeam');
  };

  const handleOpenCreate = () => {
    dialogBoolean(true);
    dialogContext('createTeam')
  };

  return (
      <div>
        <div className={classes.hero}>
          <Typography variant="h2" gutterBottom>
            Welcome {userName()}!
          </Typography>
          <Typography variant="h5" paragraph>
            Join a team or create a new one.
          </Typography>
        </div>
        <div className={classes.button}>
          <Fab variant="extended" onClick={handleOpenJoin} name="join"
               className={classes.fab}>
            <Add/>
            Join Team
          </Fab>
          <DashboardJoinTeam/>
          <Fab variant="extended" onClick={handleOpenCreate} name="create"
               className={classes.fab}>
            <Add/>
            Create Team
          </Fab>
          <DashboardCreateTeam/>
        </div>
      </div>
  );
}
