import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  hero: {
    margin: 'auto',
    maxWidth: 720,
    boxShadow: theme.shadows[0],
    padding: theme.spacing(8, 0),
    color: '#fff',
    textAlign: 'center',
  },
}));

export default function LandingHero() {
  const classes = useStyles();

  return (
      <div className={classes.hero}>
        <Typography variant="h2" gutterBottom>
          Meta Agile Process Model (MAP)
        </Typography>
        <Typography variant="h5" paragraph>
          Schnell ändernde Anforderungen an modernes
          Software-Engineering
          bedingen agile Methoden des Projektmanagements: Mit der
          Einführung
          des “Meta Agile Process Model” (MAP) werden die wichtigsten
          "Zutaten" formuliert, die für eine erfolgreiche
          Software-Entwicklung im Team notwendig sind.
        </Typography>
        <Typography variant="caption">
          Prof. Dr. Eckhart Hanser, Berufsakademie (BA) Lörrach / Duale
          Hochschule BW, D-79539 Lörrach
        </Typography>
      </div>
  );
}