import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  IconButton
} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  ArrowBack,
  Assessment,
  Equalizer,
  MoreVert,
  TrackChanges
} from "@material-ui/icons";
import {
  activeTeamId,
  cache,
  chartToggle,
  drawerWidth,
  route
} from "../Service/cache";
import {useQuery} from "@apollo/client";
import {GET_CALCULATION} from "../Service/queryService";
import {gql} from "@apollo/client/core";
import RoleCharts from "./roleCharts";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    width: '100%',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
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
  nav: {
    display: 'flex',
    position: 'relative',
    top: theme.spacing(-3),
    padding: theme.spacing(0, 2),
  },
  back: {
    flexGrow: 1,
  },
  chartButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function RoleEvaluation() {
  const classes = useStyles();

  const handleBack = () => {
    route('team');
  }
  const handleChartRadar = () => {
    chartToggle(false);
  }

  const handleChartBar = () => {
    chartToggle(true);
  }

  const {
    error: getCalculationError,
    loading: getCalculationLoading,
    data: getCalculationData
  } = useQuery(GET_CALCULATION,
      {
        variables: {teamId: activeTeamId()},
        fetchPolicy: 'network-only',
      });

  if (getCalculationLoading) {
    return null;
  }
  if (getCalculationError) {
    return `Error! ${getCalculationError}`;
  }

  const graphData = {
    labels: getCalculationData.getAssessmentCalculationForTeam.map(
        target => {
          return cache.readFragment({
            id: `PersonDto:${target.personId}`,
            fragment: gql`
                fragment getUserName on PersonDto {
                    userName
                }
            `,
          }).userName
        }),
    dataSets: {}
  }

  getCalculationData.getAssessmentCalculationForTeam.forEach(
      target => target.roles.forEach(
          role => {
            graphData.dataSets[role.roleName] = {
              affinity: graphData.dataSets[role.roleName]?.affinity ?
                  [...graphData.dataSets[role.roleName].affinity,
                    role.affinity] : [role.affinity],
              averageAffinity: graphData.dataSets[role.roleName]?.averageAffinity
                  ? [...graphData.dataSets[role.roleName].averageAffinity,
                    role.averageAffinity] : [role.averageAffinity],
            }
          }
      )
  );


  /*
teamData = {
  labels: [roles],
  datasets: [{
    userName: [0, 1, 0, ...],
    colors: {
      backgroundColor
      borderColor
      pointBackgroundColor
      pointBorderColor
      pointHoverBackgroundColor
      pointHoverBorderColor
    }
  },{...}]
}
 */

  return (
      <div className={classes.cardGrid}>
        <div className={classes.nav}>
          <div className={classes.back}>
            <Fab onClick={handleBack}>
              <ArrowBack/>
            </Fab>
          </div>
          <Fab className={classes.chartButton} onClick={handleChartRadar}>
            <TrackChanges/>
          </Fab>
          <Fab className={classes.chartButton} onClick={handleChartBar}>
            <Equalizer/>
          </Fab>
        </div>
        <Grid container spacing={4}>
          {Object.keys(graphData.dataSets).map(role => (
              <Grid item key={role} sm={12} md={6}>
                <Card className={classes.card}>
                  <CardHeader
                      avatar={<Assessment/>}
                      title={role}
                      subheader="Assessment"
                      action={
                        <IconButton>
                          <MoreVert/>
                        </IconButton>
                      }
                  />
                  <CardContent className={classes.cardContent}>
                    <RoleCharts
                        labels={graphData.labels}
                        data={graphData.dataSets[role]}
                    />
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>
      </div>
  );
}