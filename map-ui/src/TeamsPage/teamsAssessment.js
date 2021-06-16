import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  activeAssessmentTargetName,
  dialogBoolean,
  dialogContext,
  drawerWidth
} from "../Service/cache";
import {useReactiveVar} from "@apollo/client";
import {Clear} from "@material-ui/icons";
import AssessmentForm from "../AssessmentForm/assessmentForm";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
  dialogActions: {
    padding: theme.spacing(2, 2, 0, 3),
  },
  user: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  name: {
    marginLeft: theme.spacing(2),
  },
}));

export default function TeamsAssessment() {
  const classes = useStyles();
  const dialog = useReactiveVar(dialogBoolean);

  const handleClose = () => {
    dialogBoolean(false);
  }

  return (
      <Dialog
          open={dialog && dialogContext() === 'assessment'}
          fullWidth={true}
          maxWidth={'md'}
          onClose={handleClose}
          className={classes.dialog}
      >
        <DialogActions className={classes.dialogActions}>
          <div className={classes.user}>
            <Avatar alt={activeAssessmentTargetName().toUpperCase()}
                    src="/some.jpg"
                    className={classes.avatar}/>
            <Typography variant="overline" className={classes.name}>
              {activeAssessmentTargetName()}
            </Typography>
          </div>
          <IconButton onClick={handleClose} color="primary">
            <Clear/>
          </IconButton>
        </DialogActions>
        <DialogContent>
          <AssessmentForm/>
        </DialogContent>
      </Dialog>
  );
}
