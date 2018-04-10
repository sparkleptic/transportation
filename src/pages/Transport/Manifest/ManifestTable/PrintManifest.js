import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import {jneLogo} from '../../../../CusIcons/CustomIcons';
import {Paper} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';

const Styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});

var customContentStyle = {
  width: 1024,
  maxWidth: 1024,
};

class PrintManifest extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {printdata: []};
  }

  render() {
    const {openDialog, handleOpenDialog, printdatavalue, classes} = this.props;
    // const {printdata} = this.state;

    console.log('tefdfdsdfgfgdfsg');
    console.log(printdatavalue);

    return (
      <Dialog
        open={openDialog}
        onClose={() => handleOpenDialog('openSearchDialog')}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        fullWidth={true}
        fullScreen={true}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container spacing={24}>
            <Grid item xs={4} sm={4}>
              <div style={{textAlign: 'right'}} className={classes.spaceLogo}>
                <img src={jneLogo} alt="Logo" />
              </div>
            </Grid>
            <Grid item xs={5} sm={5}>
              <DialogContentText style={{textAlign: 'center', 'fontWeight': 'bold'}}>DELIVERY ORDER CEKLIST MOBIL</DialogContentText>
              <DialogContentText style={{textAlign: 'center', 'fontWeight': 'bold', fontSize: 12}}>PURI KEMBANGAN</DialogContentText>
            </Grid>
            <Grid item xs={3} sm={3}>
              <DialogContentText style={{textAlign: 'right'}}>
                <a href="javascript:window.print()" >Print</a>
              </DialogContentText>
            </Grid>

            <Grid item xs={3} sm={3}>
            </Grid>
            <Grid item xs={3} sm={3}>
              {printdatavalue ?
                <div>
                  <div style={{display: 'block', width: '100%', fontSize: 9, fontWeight: 'normal', lineHeight: 1.5}}>
                    <span style={{display: 'inline-block', width: '50%'}}>NO POL</span>
                    <span style={{display: 'inline-block', textAlign: 'right'}}>{printdatavalue.police_no ? printdatavalue.police_no : 'Not Available'}</span>
                  </div>
                  <div style={{display: 'block', width: '100%', fontSize: 9, fontWeight: 'normal', lineHeight: 1.5}}>
                    <span style={{display: 'inline-block', width: '50%'}}>TANGGAL</span>
                    <span style={{display: 'inline-block', textAlign: 'right'}}>{printdatavalue.created_on ? printdatavalue.created_on : 'Not Available'}</span>
                  </div>
                  <div style={{display: 'block', width: '100%', fontSize: 9, fontWeight: 'normal', lineHeight: 1.5}}>
                    <span style={{display: 'inline-block', width: '50%'}}>DRIVER</span>
                    <span style={{display: 'inline-block', textAlign: 'right'}}>{printdatavalue.driver_name ? printdatavalue.driver_name : 'Not Available'}</span>
                  </div>
                  <div style={{display: 'block', width: '100%', fontSize: 9, fontWeight: 'normal', lineHeight: 1.5}}>
                    <span style={{display: 'inline-block', width: '50%'}}>JAM BERANGKAT</span>
                    <span style={{display: 'inline-block', textAlign: 'right'}}>{printdatavalue.etd ? printdatavalue.etd : 'Not Available'}</span>
                  </div>
                  {printdatavalue.vehicle_id &&
                    <div style={{display: 'block', width: '100%', fontSize: 9, fontWeight: 'normal', lineHeight: 1.5}}>
                      <span style={{display: 'inline-block', width: '50%'}}>AIRLINES FLIGHT</span>
                      <span style={{display: 'inline-block', textAlign: 'right'}}>{printdatavalue.vehicle_id ? printdatavalue.vehicle_id : 'Not Available'}</span>
                    </div>
                  }
                </div>
              : null }
            </Grid>
            <Grid item xs={2} sm={2}></Grid>
            <Grid item xs={2} sm={2}>
              <DialogContentText style={{textAlign: 'right', borderWidth: 2, borderStyle: 'solid', padding: 12, }}>
                <DialogContentText style={{textAlign: 'center'}}>MOBIL</DialogContentText>
              </DialogContentText>
            </Grid>            

          </Grid>

        </DialogTitle>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Menifest No</TableCell>
                <TableCell>Checker Name</TableCell>
                <TableCell>Destination Name</TableCell>
                <TableCell>Driver Name</TableCell>
                <TableCell>Origin Name</TableCell>
                <TableCell>Police No</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {printdatavalue ?
                <TableRow>
                  <TableCell>{printdatavalue.manifest_no}</TableCell>
                  <TableCell>{printdatavalue.checker_name ? printdatavalue.checker_name : 'Not Selected'}</TableCell>
                  <TableCell>{printdatavalue.destination_name ? printdatavalue.destination_name : 'Not Selected' }</TableCell>
                  <TableCell>{printdatavalue.driver_name ? printdatavalue.driver_name : 'Not Selected' }</TableCell>
                  <TableCell>{printdatavalue.origin_name ? printdatavalue.origin_name : 'Not Selected'}</TableCell>
                  <TableCell>{printdatavalue.police_no ? printdatavalue.police_no : 'Not Selected'}</TableCell>
                </TableRow>
              : null }
            </TableBody>
          </Table>
        </Paper>
      </Dialog>
    );
  }
}
export default withStyles(Styles)(PrintManifest);
