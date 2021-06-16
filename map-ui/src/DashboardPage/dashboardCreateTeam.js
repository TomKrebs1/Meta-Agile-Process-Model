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
import {CREATE_TEAM} from "../Service/updateService";
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

export default function DashboardCreateTeam() {
  const classes = useStyles();
  const createTeamRef = useRef();
  const dialog = useReactiveVar(dialogBoolean);

  const [addTeamMutation] = useMutation(CREATE_TEAM, {
    refetchQueries: [{
      query: GET_PERSONAL_TEAMS,
      variables: {id: userId(), userName: userName()}
    }]
  });
  const handleCreate = () => {
    addTeamMutation({
      variables: {
        teamName: createTeamRef.current.value,
        personToCreate: userId()
      }
    });
    handleClose();
  };

  const handleClose = () => {
    dialogBoolean(false);
  }

  return (
      <Dialog
          open={dialog && dialogContext() === 'createTeam'}
          onClose={handleClose}
          className={classes.dialog}
      >
        <DialogTitle>Join Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new team you need to provide a team name.
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              label="Team Name"
              fullWidth
              inputRef={createTeamRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
}