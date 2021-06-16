import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useRef} from "react";
import {useMutation, useReactiveVar} from "@apollo/client";
import {JOIN_TEAM} from "../Service/updateService";
import {GET_PERSONAL_TEAMS} from "../Service/queryService";
import {
  dialogBoolean,
  dialogContext,
  drawerWidth,
  userId,
  userName
} from "../Service/cache";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth()}px)`,
      marginLeft: drawerWidth(),
    },
  },
}));

export default function DashboardJoinTeam() {
  const classes = useStyles();
  const joinTeamRef = useRef();
  const dialog = useReactiveVar(dialogBoolean);

  const [joinTeamMutation] = useMutation(JOIN_TEAM, {
    refetchQueries: [{
      query: GET_PERSONAL_TEAMS,
      variables: {id: userId(), userName: userName()}
    }]
  });
  const handleJoin = () => {
    joinTeamMutation({
      variables: {
        teamToken: joinTeamRef.current.value,
        personId: userId()
      }
    });
    handleClose();
  }

  const handleClose = () => {
    dialogBoolean(false);
  }

  return (
      <Dialog
          open={dialog && dialogContext() === 'joinTeam'}
          onClose={handleClose}
          className={classes.dialog}
      >
        <DialogTitle>Join Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join a team you need to send the invite token.
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              label="Team Token"
              fullWidth
              inputRef={joinTeamRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoin} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
  );
}