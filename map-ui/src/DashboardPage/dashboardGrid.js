import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid
} from "@material-ui/core";
import Image from "../assets/map-background.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {activeTeamId, route, userId, userName} from "../Service/cache";
import {useQuery} from "@apollo/client";
import {GET_PERSONAL_TEAMS} from "../Service/queryService";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    width: '100%',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '33%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function DashboardGrid() {
  const classes = useStyles();

  const {loading, error, data} = useQuery(GET_PERSONAL_TEAMS,
      {
        variables: {id: userId(), userName: userName()},
      });

  const handleClick = (event, page, team) => {
    route(page);
    activeTeamId(team);
  };

  if (loading) {
    return null;
  }
  if (error) {
    return `Error! ${error}`;
  }

  return (
      <div className={classes.cardGrid}>
        <Grid container spacing={4}>
          {data === undefined ? null : data.getPerson.joinedTeams.map(
              (team) => (
                  <Grid item key={team.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardActionArea
                          onClick={(event) => handleClick(event, 'team',
                              team.id)}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={Image}
                            title="Team Banner"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {team.teamName}
                          </Typography>
                          <Typography>
                            This is going to be a short team description.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
              ))}
        </Grid>
      </div>
  );
}