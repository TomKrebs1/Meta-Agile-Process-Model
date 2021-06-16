import {useReactiveVar} from "@apollo/client";
import {dialogBoolean, dialogContext} from "../Service/cache";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Clear} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    padding: theme.spacing(2, 2, 0, 3),
  },
  dialogTitle: {
    flexGrow: 1,
    padding: theme.spacing(1, 0)
  },
}));

export default function DataProtection() {
  const classes = useStyles();
  const dialog = useReactiveVar(dialogBoolean);

  const handleClose = () => {
    dialogBoolean(false);
  }

  return (
      <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          open={dialog && dialogContext() === 'dataProtection'}
          onClose={handleClose}
      >
        <DialogActions className={classes.dialogActions}>
          <DialogTitle className={classes.dialogTitle}>
            Datenschutz
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <Clear/>
          </IconButton>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Die MAP App ist aus einer Projektarbeit von Studenten der DHBW
            entstanden. Die erhobenen personenbezogenen Daten werden lediglich
            zur Forschungszwecken im Bezug auf die Arbeit mit MAP verwendet.
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}