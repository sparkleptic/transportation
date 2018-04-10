// @flow

import React from 'react';
import {Button} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

type Props = {
  title: string,
  content: string,
  isOpen: boolean,
  autoFocusButton?: 'cancel' | 'confirm',
  confirmButtonLabel?: string,
  cancelButtonLabel?: string,
  confirmButtonAction: () => void,
  cancelButtonAction: () => void,
  onClose: () => void,
};

export default function ConfirmationModalDialog(props: Props) {
  let {
    isOpen,
    title,
    content,
    confirmButtonAction,
    cancelButtonAction,
    confirmButtonLabel,
    cancelButtonLabel,
    onClose,
    autoFocusButton,
  } = props;

  let defaultAutoFocusButton = autoFocusButton || 'confirm';
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancelButtonAction}
          color="primary"
          autoFocus={defaultAutoFocusButton === 'cancel'}
        >
          {cancelButtonLabel || 'Cancel'}
        </Button>
        <Button
          onClick={confirmButtonAction}
          color="primary"
          autoFocus={defaultAutoFocusButton === 'confirm'}
        >
          {confirmButtonLabel || 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
