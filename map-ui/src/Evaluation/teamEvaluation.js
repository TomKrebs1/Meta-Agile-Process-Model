import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  IconButton
} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowBack, Assessment, MoreVert} from "@material-ui/icons";
import {activeTeamId, cache, drawerWidth, route} from "../Service/cache";
import {useQuery} from "@apollo/client";
import {GET_CALCULATION} from "../Service/queryService";
import {gql} from "@apollo/client/core";
import TeamChart from "./teamChart";

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
    width: '100%',
    maxWidth: 960,
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
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function TeamEvaluation() {
  const classes = useStyles();

  const handleBack = () => {
    route('team');
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
    labels: [],
    datasets: []
  }

  const color = [
    {primary: '#b22a0033', secondary: '#ff3d00'},
    {primary: '#b2a30033', secondary: '#ffea00'},
    {primary: '#2a3eb133', secondary: '#3d5afe'},
    {primary: '#52b20233', secondary: '#76ff03'},
    {primary: '#b2102f33', secondary: '#ff1744'},
    {primary: '#14a37f33', secondary: '#1de9b6'},
    {primary: '#4615b233', secondary: '#651fff'},
    {primary: '#b2650033', secondary: '#ff9100'},
    {primary: '#007bb233', secondary: '#00b0ff'},
    {primary: '#8ab20033', secondary: '#c6ff00'},
    {primary: '#9500ae33', secondary: '#d500f9'},
    {primary: '#00a15233', secondary: '#00e676'},
    {primary: '#1c54b233', secondary: '#2979ff'},
    {primary: '#b2890033', secondary: '#ffc400'},
    {primary: '#00a0b233', secondary: '#00e5ff'},
    {primary: '#ab003c33', secondary: '#f50057'},
  ]

  let colorIndex = 0;

  getCalculationData.getAssessmentCalculationForTeam.forEach(
      target => {
        const labelData = new Set([])

        const member = cache.readFragment({
          id: `PersonDto:${target.personId}`,
          fragment: gql`
              fragment getUserName on PersonDto {
                  userName
              }
          `,
        })

        const memberData = {
          userName: member.userName,
          affinity: [],
          colors: color[colorIndex]
        }

        colorIndex = (colorIndex + 1) % color.length;

        graphData.datasets = [...graphData.datasets, memberData]

        target.roles.forEach(role => {
              labelData.add(role.roleName);
              memberData.affinity = [...memberData.affinity, role.affinity];
            }
        );

        graphData.labels = [...labelData]
      }
  )

  return (
      <div className={classes.cardGrid}>
        <div className={classes.nav}>
          <div className={classes.back}>
            <Fab onClick={handleBack}>
              <ArrowBack/>
            </Fab>
          </div>
        </div>
        <div className={classes.content}>
          <Card className={classes.card}>
            <CardHeader
                avatar={<Assessment/>}
                title="Team Roles"
                subheader="Assessment"
                action={
                  <IconButton>
                    <MoreVert/>
                  </IconButton>
                }
            />
            <CardContent className={classes.cardContent}>
              <TeamChart data={graphData}/>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}