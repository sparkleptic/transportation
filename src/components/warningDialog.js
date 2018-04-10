import React from 'react';
import {Button} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const WarningDialog = (props) => {
  const {open, handleModal, text} = props;

  return (
    <Dialog
      open={open}
      onClose={handleModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Warning!'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModal} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default WarningDialog;
