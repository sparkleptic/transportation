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
  const {dialogCout, error, errorDetails, handleAddSubmit} = props;

  return (
    <Dialog
      open={dialogCout}
      onClose={handleAddSubmit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {!error ? 'New User' : 'Something went wrong, check the console!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!error
            ? 'Are you sure want to add this user ?'
            : 'check the console!'}
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
