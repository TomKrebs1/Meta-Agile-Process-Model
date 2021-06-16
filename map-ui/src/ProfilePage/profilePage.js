import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  activeAssessmentGeneralAttributeId,
  activeAssessmentProjectAttributeId, assessmentLoading,
  drawerWidth,
  userId,
  userName
} from "../Service/cache";
import ProfileSettings from "./profileSettings";
import AssessmentForm from "../AssessmentForm/assessmentForm";
import {useQuery} from "@apollo/client";
import {GET_PERSON} from "../Service/queryService";

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
}));

export default function ProfilePage() {
  const classes = useStyles();

  const {
    loading: getPersonLoading,
    error: getPersonError,
    data: getPersonData
  } = useQuery(GET_PERSON, {
    variables: {id: userId(), userName: userName()},
  });

  if (getPersonLoading) {
    return null;
  }
  if (getPersonError) {
    return `Error! ${getPersonError}`;
  }

  activeAssessmentGeneralAttributeId(
      getPersonData.getPerson.generalAttribute.id);
  activeAssessmentProjectAttributeId(
      getPersonData.getPerson.projectAttribute.id);
  assessmentLoading(false);

  return (
      <div className={classes.content}>
        <ProfileSettings/>
        <AssessmentForm/>
      </div>
  );
}