import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from 'material-ui';
const ConfirmationDialog = (props) => {
  const {dialogCout, handleAddSubmit} = props;

  return (
    <Dialog
      open={dialogCout}
      onClose={handleAddSubmit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">New special Tariff</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to add this special tariff ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSubmit}>Cancel</Button>
        <Button onClick={handleAddSubmit} variant="raised" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
