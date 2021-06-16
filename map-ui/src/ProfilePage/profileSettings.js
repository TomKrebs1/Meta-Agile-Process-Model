import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Divider, Grid, Paper, Switch} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {userId, userName} from "../Service/cache";
import {useMutation, useQuery} from "@apollo/client";
import {GET_DARKMODE} from "../Service/queryService";
import {UPDATE_PERSON} from "../Service/updateService";

const useStyles = makeStyles((theme) => ({
  section: {
    maxWidth: 960,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  paperGrid: {
    flex: 1,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
  header: {
    color: theme.palette.text.secondary,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  darkMode: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(0, 4, 0, 2),
  },
  darkModeText: {
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }
}));

export default function ProfileSettings() {
  const classes = useStyles();

  const {loading, error, data} = useQuery(GET_DARKMODE, {
    variables: {id: userId(), userName: userName()},
    fetchPolicy: "cache-only"
  });

  const [updateDarkMode] = useMutation(UPDATE_PERSON);
  const handleChange = (event) => {
    updateDarkMode({
      variables: {
        id: userId(),
        [event.target.name]: event.target.checked
      }
    })
  }

  if (loading) {
    return null;
  }
  if (error) {
    return `Error! ${error}`;
  }

  return (
      <div className={classes.section}>
        <Paper elevation={0} className={classes.paperGrid}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.header}>
                <Typography variant="h5" gutterBottom>
                  Settings
                </Typography>
                <Divider className={classes.divider}/>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.darkMode}>
                <div className={classes.darkModeText}>
                  <Typography variant="subtitle2">
                    Dark Mode
                  </Typography>
                  <Typography variant="caption">
                    When it is dark enough, you can see the stars.
                  </Typography>
                </div>
                <Switch
                    checked={data.getPerson.darkModeOn}
                    onChange={handleChange}
                    name="darkModeOn"
                    color="primary"
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
  );
}