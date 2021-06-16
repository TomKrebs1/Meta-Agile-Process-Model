import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Button} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import {dialogBoolean, dialogContext} from "../Service/cache";
import DataProtection from "./dataProtection";

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © MAP-App '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    minHeight: 96,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function LandingFooter() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <CssBaseline/>
        <footer className={classes.footer}>
          <AppBar position="fixed" className={classes.appBar}
                  color="textSecondary">
            <Toolbar className={classes.toolbar}>
              <Container maxWidth="sm">
                <Typography variant="body1">Meta Agile Process Model
                  Application</Typography>
                <Copyright/>
              </Container>
              <div className={classes.grow}/>
              <Button onClick={() => {
                dialogBoolean(true);
                dialogContext('dataProtection')
              }} size="large">
                Datenschutz
              </Button>
              <DataProtection/>
            </Toolbar>
          </AppBar>
        </footer>
      </div>
  );
}