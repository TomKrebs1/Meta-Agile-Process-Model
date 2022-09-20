import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {AccountCircle, Dashboard, Group} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import {Avatar, Typography} from "@material-ui/core";
import {
  activeTeamId,
  drawerToggle,
  route,
  userId,
  userName
} from "../Service/cache";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_PERSONAL_TEAMS} from "../Service/queryService";

const useStyles = makeStyles((theme) => ({
  section: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  drawerContent: {
    flex: 1,
  },
  drawerItems: {
    padding: theme.spacing(2, 0, 2, 5)
  },
  drawerItemsNested: {
    padding: theme.spacing(1, 0, 1, 5)
  },
  alignBottom: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function DrawerContent() {
  const classes = useStyles();

  const {loading, error, data} = useQuery(GET_PERSONAL_TEAMS,
      {
        variables: {id: userId(), userName: userName()},
      });

  const active = useReactiveVar(activeTeamId);
  const router = useReactiveVar(route);
  const handleClick = (event, page, team) => {
    route(page);
    activeTeamId(team);
    drawerToggle(false);
  };

  if (loading) {
    return null;
  }
  if (error) {
    return `Error! ${error}`;
  }

  return (
      <div className={classes.section}>
        <div className={classes.toolbar}/>
        <div className={classes.drawerContent}>
          <Divider/>
          <List>
            <ListItem
                button
                selected={router === 'dashboard'}
                onClick={(event) => handleClick(event, 'dashboard', activeTeamId())}
                className={classes.drawerItems}
            >
              <ListItemIcon>
                <Dashboard/>
              </ListItemIcon>
              <ListItemText primary={'Dashboard'}/>
            </ListItem>
            <ListItem
                button
                selected={router === 'profile'}
                onClick={(event) => handleClick(event, 'profile', activeTeamId())}
                className={classes.drawerItems}
            >
              <ListItemIcon>
                <AccountCircle/>
              </ListItemIcon>
              <ListItemText primary={'Profile'}/>
            </ListItem>
          </List>
          <Divider/>
          <List>
            <ListItem className={classes.drawerItemsNested}>
              <ListItemText>
                <Typography variant="button">
                  Teams
                </Typography>
              </ListItemText>
            </ListItem>
            {data === undefined ? null : data.getPerson.joinedTeams.map(
                (team) => (
                    <ListItem
                        button
                        key={team.id}
                        selected={router === 'team' && team.id === active}
                        onClick={(event) => handleClick(event, 'team', team.id)}
                        className={classes.drawerItemsNested}
                    >
                      <ListItemIcon>
                        <Group/>
                      </ListItemIcon>
                      <ListItemText primary={team.teamName}/>
                    </ListItem>
                ))}
          </List>
          <Divider/>
          <List>
            <ListItem className={classes.drawerItemsNested}>
              <ListItemText>
                <Typography variant="button">
                  Team Verteilung
                </Typography>
              </ListItemText>
            </ListItem>
            {data === undefined ? null : data.getPerson.joinedTeams.map(
                (team) => (
                    <ListItem
                        button
                        key={team.id}
                        selected={router === 'teamRoles' && team.id === active}
                        onClick={(event) => handleClick(event, 'teamRoles', team.id)}
                        className={classes.drawerItemsNested}
                    >
                      <ListItemIcon>
                        <Group/>
                      </ListItemIcon>
                      <ListItemText primary={team.teamName}/>
                    </ListItem>
                ))}
          </List>
        </div>
        <div className={classes.alignBottom}>
          <Avatar alt={userName().toUpperCase()} src="/some.jpg"
                  className={classes.avatar}/>
          <Typography variant="overline">
            {userName()}
          </Typography>
        </div>
      </div>
  );
}
