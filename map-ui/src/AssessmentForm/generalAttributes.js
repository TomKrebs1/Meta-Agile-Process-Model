import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Divider, FormControlLabel, Switch} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useMutation} from "@apollo/client";
import {UPDATE_GENERAL_ATTRIBUTES} from "../Service/updateService";
import {
  activeAssessmentGeneralAttributeId,
  cache,
  errorMessage,
  errorSnackbar
} from "../Service/cache";
import {gql} from "@apollo/client/core";

const useStyles = makeStyles((theme) => ({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: theme.spacing(0, 2)
  },
  header: {
    color: theme.palette.text.secondary,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  switch: {
    minHeight: 80,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function GeneralAttributes() {
  const classes = useStyles();

  const getGeneralAttribute = cache.readFragment({
    id: `GeneralAttribute:${activeAssessmentGeneralAttributeId()}`,
    fragment: gql`
        fragment getGeneralAttribute on GeneralAttribute {
            id
            communication
            experience
            resilience
        }
    `,
  })

  const [updateGeneralAttributes] = useMutation(UPDATE_GENERAL_ATTRIBUTES);
  const handleChange = (event) => {
    updateGeneralAttributes({
      variables: {
        id: getGeneralAttribute.id,
        [event.target.name]: event.target.checked
      }
    }).catch((error) => {
      errorMessage(error.message);
      errorSnackbar(true);
    })
  };

  return (
      <div className={classes.section}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography variant="subtitle1" gutterBottom>
                General Human Characteristics
              </Typography>
              <Divider className={classes.divider}/>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.switch}>
              <FormControlLabel
                  control={
                    <Switch
                        checked={getGeneralAttribute.communication}
                        onChange={handleChange}
                        name="communication"
                        color="primary"
                    />
                  }
                  label="Open-minded/Outgoing"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.switch}>
              <FormControlLabel
                  control={
                    <Switch
                        checked={getGeneralAttribute.experience}
                        onChange={handleChange}
                        name="experience"
                        color="primary"
                    />
                  }
                  label="Experience"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.switch}>
              <FormControlLabel
                  control={
                    <Switch
                        checked={getGeneralAttribute.resilience}
                        onChange={handleChange}
                        name="resilience"
                        color="primary"
                    />
                  }
                  label="Able to work under pressure"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
}
