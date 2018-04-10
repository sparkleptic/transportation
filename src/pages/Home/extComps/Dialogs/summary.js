import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import withStyles from 'material-ui/styles/withStyles';
import SummaryContent from './summaryContent';

const Styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  content: {
    height: 'auto',
  },
});

const Summary = (props) => {
  const {
    openSummaryDialog,
    handleOpenDialog,
    classes,
    summaryData,
    handleSelect,
    handleSubmit,
    methodData,
    activeNode,
    onChangePaymentType,
  } = props;
  return (
    <Dialog
      open={openSummaryDialog}
      onClose={() => handleOpenDialog('openSummaryDialog')}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Summary</DialogTitle>
      <DialogContent className={classes.content}>
        <SummaryContent
          data={summaryData}
          methodData={methodData}
          activeNode={activeNode}
          handleSelect={handleSelect}
          onChangePaymentType={onChangePaymentType}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="raised"
          style={{marginRight: 17}}
          onClick={handleSubmit}
          color="primary"
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default withStyles(Styles)(Summary);
