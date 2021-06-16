import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Background from "../assets/teamwork.jpg";
import LandingHero from "./landingHero";
import LandingFooter from "./landingFooter";
import Image from "../assets/map.jpg"

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(6),
    maxWidth: 1280,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    height: 1000,
    borderRadius: 0,
  },
  heroImage: {
    height: LandingHero().height + 200,
    backgroundPosition: 'center center',
    position: 'relative',
    maxHeight: '1000px',
    backgroundImage: 'url(' + Background + ')',
    backgroundSize: 'cover',
  },
  landing: {
    textAlign: 'center',
    padding: theme.spacing(8,0),
  }
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
      <div className={classes.heroImage}>
        <Container className={classes.content}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
             <LandingHero/>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <img src={Image} alt="map"/>
                <Typography variant="h2" className={classes.landing}>
                  Hier soll Content folgen...
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <LandingFooter/>
      </div>
  );
}