import {makeStyles} from "@material-ui/core/styles";
import GeneralAttributes from "./generalAttributes";
import ProjectAttributes from "./projectAttributes";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, Divider, Snackbar} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {useReactiveVar} from "@apollo/client";
import {
  assessmentLoading,
  drawerWidth,
  errorMessage,
  errorSnackbar
} from "../Service/cache";
import {Alert} from "@material-ui/lab";

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
  loading: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(10),
  },
  formContainer: {
    flex: 1,
  },
  formBody: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
}));

export default function AssessmentForm() {
  const classes = useStyles();
  const loadingAssessment = useReactiveVar(assessmentLoading);
  const snackbarError = useReactiveVar(errorSnackbar);

  const handleClose = () => {
    errorSnackbar(false);
  }

  return (
      <div className={classes.section}>
        <Paper elevation={0} className={classes.paperGrid}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.header}>
                <Typography variant="h5" gutterBottom>
                  Assessment Form
                </Typography>
                <Divider className={classes.divider}/>
              </div>
            </Grid>
            {loadingAssessment ?
                <div className={classes.loading}>
                <CircularProgress />
                </div> :
                <div className={classes.formContainer}>
                  <Grid item xs={12} className={classes.formBody}>
                    <GeneralAttributes/>
                  </Grid>
                  <Grid item xs={12} className={classes.formBody}>
                    <ProjectAttributes/>
                  </Grid>
                </div>
            }
          </Grid>
        </Paper>
        <Snackbar open={snackbarError} autoHideDuration={6000} onClose={handleClose}>
          <Alert className={classes.alert} onClose={handleClose} severity="error" variant="filled">
            {errorMessage()}
          </Alert>
        </Snackbar>
      </div>
  );
}