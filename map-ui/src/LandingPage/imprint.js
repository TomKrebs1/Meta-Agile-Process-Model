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

export default function Imprint() {
  const classes = useStyles();
  const dialog = useReactiveVar(dialogBoolean);

  const handleClose = () => {
    dialogBoolean(false);
  }

  return (
      <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={dialog && dialogContext() === 'imprint'}
          onClose={handleClose}
      >
        <DialogActions className={classes.dialogActions}>
          <DialogTitle className={classes.dialogTitle}>Impressum</DialogTitle>
          <IconButton onClick={handleClose}>
            <Clear/>
          </IconButton>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet.
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros et accumsan et iusto odio dignissim qui blandit praesent
            luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
            autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros et accumsan et iusto odio dignissim qui blandit praesent
            luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            Nam liber tempor cum soluta nobis eleifend option congue nihil
            imperdiet doming id quod mazim placerat facer.
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}