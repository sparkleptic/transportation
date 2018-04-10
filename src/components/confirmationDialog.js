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
  const {open, handleAction, ...rest} = props;

  this.handleCancel = () => handleAction('no');
  this.handleSubmit = () => handleAction('yes');

  return (
    <Dialog
      open={open}
      onClose={this.handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{rest.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {rest.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleCancel}>
          {' '}
          {rest.nolabel || 'Cancel'}{' '}
        </Button>
        <Button onClick={this.handleSubmit} variant="raised" color="primary">
          {' '}
          {rest.yeslabel || 'Add'}{' '}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
