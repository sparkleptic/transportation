import React from 'react';
import {Button} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const EmptyDialog = (props) => {
  const {emptyValDialog, handleModal} = props;

  return (
    <Dialog
      open={emptyValDialog}
      onClose={() => handleModal('emptyValDialog')}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Gagal mengirim!'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {'Pastikan inputan anda tidak ada yang kosong'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleModal('emptyValDialog')} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EmptyDialog;
