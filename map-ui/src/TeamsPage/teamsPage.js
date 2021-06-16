import {makeStyles, useTheme} from "@material-ui/core/styles";
import React from "react";
import {
  activeAssessmentGeneralAttributeId,
  activeAssessmentProjectAttributeId,
  activeAssessmentTargetName,
  activeTeamId,
  assessmentLoading,
  dialogBoolean,
  dialogContext,
  drawerWidth,
  route,
  userId
} from "../Service/cache";
import {useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {GET_TEAM} from "../Service/queryService";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Fab,
  Grid
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Check, Clear, Equalizer, Group} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import TeamsAssessment from "./teamsAssessment";
import {CREATE_ASSESSMENT, UPDATE_ASSESSMENT} from "../Service/updateService";

const useStyles = makeStyles((theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8, 0, 4, 0),
    textAlign: 'center',
  },
  invite: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    width: 'fit-content',
    color: theme.palette.text.secondary,
  },
  inviteText: {
    padding: theme.spacing(2),
  },
  inviteToken: {
    padding: theme.spacing(0, 2, 0, 2),
  },
  cardGrid: {
    width: '100%',
    maxWidth: 1280,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  cardAvatar: {
    marginRight: theme.spacing(2),
  },
  cardText: {
    flexGrow: 1,
  },
  evaluation: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  evaluationFab: {
    marginLeft: theme.spacing(2),
  },
}));

export default function TeamsPage() {
  const classes = useStyles();
  const theme = useTheme();
  const active = useReactiveVar(activeTeamId);

  const {
    error: getTeamError,
    loading: getTeamLoading,
    data: getTeamData
  } = useQuery(GET_TEAM,
      {
        variables: {id: active},
      });

  const [updateAssessment] = useMutation(UPDATE_ASSESSMENT, {
    refetchQueries: [{
      query: GET_TEAM,
      variables: {id: activeTeamId()}
    }]
  });
  const [createAssessment] = useMutation(CREATE_ASSESSMENT, {
    refetchQueries: [{
      query: GET_TEAM,
      variables: {id: activeTeamId()}
    }]
  });

  const handleEvent = (event, memberId, memberName) => {
    assessmentLoading(true);
    activeAssessmentTargetName(memberName);
    dialogBoolean(true);
    dialogContext('assessment')
    updateAssessment({
      variables: {
        assessmentOwnerId: userId(),
        assessmentTargetId: memberId,
        teamId: activeTeamId(),
      },
    }).then((assessmentData) => {
      activeAssessmentGeneralAttributeId(
          assessmentData.data.updatePersonAssessment.generalAttribute.id
      );
      activeAssessmentProjectAttributeId(
          assessmentData.data.updatePersonAssessment.projectAttribute.id
      );
      assessmentLoading(false);
    }).catch((error) => {
      console.error(error);
      createAssessment({
        variables: {
          assessmentOwnerId: userId(),
          assessmentTargetId: memberId,
          teamId: activeTeamId()
        },
      }).then(
          (assessmentData) => {
            activeAssessmentGeneralAttributeId(
                assessmentData.data.addPersonAssessment.generalAttribute.id
            );
            activeAssessmentProjectAttributeId(
                assessmentData.data.addPersonAssessment.projectAttribute.id
            );
            assessmentLoading(false);
          })
    });
  }

  const handleRoleEvaluation = () => {
    route('roleEvaluation');
  }
  const handleTeamEvaluation = () => {
    route('teamEvaluation');
  }

  if (getTeamLoading) {
    return null;
  }
  if (getTeamError) {
    return `Error! ${getTeamError}`;
  }

  return (
      <div className={classes.section}>
        <div className={classes.hero}>
          <Typography variant="h2" gutterBottom>
            Welcome to the {getTeamData.getTeam.teamName} team!
          </Typography>
          <Typography variant="h5" paragraph>
            To have equivalent results to the classical MAP evaluation every
            team member needs to have no more than two external assessments.
            Please organize your team accordingly beforehand since there is no
            way of removing an assessment once it has been activated.
          </Typography>
          <Paper elevation={0} className={classes.invite}>
            <Typography variant="subtitle1" className={classes.inviteText}>
              Invite Token
            </Typography>
            <Divider orientation="vertical" flexItem/>
            <Typography variant="h6" className={classes.inviteToken}>
              {getTeamData.getTeam.inviteToken}
            </Typography>
          </Paper>
        </div>
        <TeamsAssessment/>
        <div className={classes.cardGrid}>
          <Grid container spacing={2}>
            {getTeamData.getTeam.teamMembers.map((member) => (
                <Grid item key={member.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardActionArea
                        onClick={(event) => handleEvent(event, member.id,
                            member.userName)}>
                      <CardContent className={classes.cardContent}>
                        <Avatar
                            className={classes.cardAvatar}
                            alt={member.userName.toUpperCase()}
                            src="/some.jpg"
                        />
                        <div className={classes.cardText}>
                          <Typography variant="body2">
                            {
                              (member.firstName ?? '')
                              + ' '
                              + (member.lastName ?? '')
                            }
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {"@" + member.userName}
                          </Typography>
                        </div>
                        <div>
                          {
                            getTeamData.getTeam.personAssessments?.find(
                                target => target.assessmentTarget.id
                                    === member.id)
                                ?
                                <Check
                                    fontSize="large"
                                    style={{color: theme.palette.success.main}}
                                /> :
                                <Clear
                                    fontSize="large"
                                />
                          }
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.evaluation}>
          <Fab className={classes.evaluationFab} onClick={handleTeamEvaluation}>
            <Group/>
          </Fab>
          <Fab className={classes.evaluationFab} onClick={handleRoleEvaluation}>
            <Equalizer/>
          </Fab>
        </div>
      </div>
  );
}
