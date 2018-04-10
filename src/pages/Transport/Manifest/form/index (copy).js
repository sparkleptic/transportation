import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Paper, TextField, Button, Chip} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import { MenuItem } from 'material-ui/Menu';
import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import SearchDestination from './SearchDestination';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton/IconButton';
import EnhancedInboundTableHead from './extComps/tableHead';
import {Search, ArrowDropDown} from 'material-ui-icons';
import {styles} from '../../../css';
import ConfirmationDialog from '../../../../components/confirmationDialog';
import ReactMaterialUiNotifications from '../../../../components/ReactMaterialUiNotifications';
import ReferenceDropDown from '../../../../components/refrencedropdown';
import renderIf from '../../../../components/renderIf';
import {getEntityList, getEntity, postEntity, putEntity} from '../../../../actions/entity';
import UserLinearProgress from '../UserLinearprogress';

const WAIT_INTERVAL = 1000;
var baglistdata = [];
var baglistsorted = [];
var textContent = '';
var manifest_ID = '';
var destination_ID = '';
class AddMenifestListForm extends Component {

  constructor() {
    super();
    this.state = {
      courierFieldvalue: '',
      confirm: false,
      req_bagnumber: '',
      username: '',
      selected: [],
      menifesttype: null,
      msgg: null,
      smuvalue: '',
      name: 'first', 
      node_id: null,
      node_name: null,
      plate_number: null,
      destination_id: null,
      driver_id: null,
      driver_name: null,
      checker_id: null,
      checker_name: null,
      baglistgetitem: [],
      baglistdatast: [],
      manifest_type_id: null,
      manifest_type_name: null,
      vehicleTypeData: [],
      manifestTypevalue: [],
      platenumberdata: [],
      driveranccheckerlist: [],
      ready: false,
      loaderflag: false,
      rowdata:[]
    };
  }

  componentWillMount() {
    this.timer = null;
  }

  handletypeChange = event => {

    // var node = document.getElementById('manifest_type');
    // textContent = node.textContent;

    //var sel_menifest = event.nativeEvent.explicitOriginalTarget.innerText;
    this.setState({ 
      [event.target.name]: event.target.value,
      // menitype: sel_menifest
    });

    manifest_ID = event.target.value;
    destination_ID = this.state.node_id;

    if(manifest_ID && manifest_ID != null && destination_ID && destination_ID != null){
      getEntityList(`transport_book?to_node=${destination_ID}&manifest_type_id=${manifest_ID}`, null).then((response) => {
        const {data} = response.data;
        // console.log(data);
        this.setState({smunumber: data.transport_no});
      });
    }

    // Get Menifest Type Data Value
    getEntityList(`vehicle/${event.target.value}/activity`, null).then((response) => {
      const {data} = response.data.data;
      this.setState({platenumberdata: data});
    });

  };

  handleUpdate = (name) => (value) => {
    this.setState({[name]: value});

    manifest_ID = this.state.menifesttype;
    destination_ID = value;

    if(manifest_ID && manifest_ID != null && destination_ID && destination_ID != null){
      getEntityList(`transport_book?to_node=${destination_ID}&manifest_type_id=${manifest_ID}`, null).then((response) => {
        const {data} = response.data;
        // console.log(data);
        this.setState({smunumber: data.transport_no});
      });
    }
  };

  handleResetvalue = () => {
    return this.setState({req_bagnumber: '', rowdata: [], baglistdatast: [], loaderflag: false,});
  }

  handleChange = (name) => (event) => {

    if (event.target.value == '') {
      return this.setState({[name]: '', rowdata: [], baglistdatast: [], loaderflag: false,});
    }

    this.setState({
      [name]: event.target.value,
      loaderflag: true,
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.search(), WAIT_INTERVAL);
  };

  search = (key) => {
  	if (this.state.req_bagnumber.length > 13) {
	    return getEntityList(`bag/${this.state.req_bagnumber}`, null).then(
	      (response) => {
	        const {data} = response.data;
	        if (data && data != null) {
	        	// if (containsObject(data, baglistdata)) {
		    		  // baglistdata.push(data);
          //     for (var i = baglistdata.length; i > 0; i--) {
          //       baglistsorted.push(baglistdata[i-1]);
          //     }
		        	return this.setState({rowdata: data, baglistdatast: data});
	        	// }else{
	        	// 	return this.setState({alreadyBag: 'alreadyBag', loaderflag: false});
		    		  // baglistdata.push(data);
		        // 	return this.setState({rowdata: data});
	        	// }else{
	        		// return this.setState({alreadyBag: 'alreadyBag', loaderflag: false});
	        	// }
	    	}else{
	    		alert('Bag Detail is not available!!');
	    		this.setState({loaderflag: false});  		
	    	}
	      },
	    );
  	}else{
  		//alert('Please Enter Correct bag No.');
      this.setState({loaderflag: false});
  	}
  };

  handlePlateChange = event => {
    //var sel_platenum = event.nativeEvent.explicitOriginalTarget.nodeValue;
    this.setState({
      [event.target.name]: event.target.value,
      //platenumname: sel_platenum
    });
  };

  handlePlateChangeAddNew = event => {
    //var sel_platenum = event.nativeEvent.explicitOriginalTarget.nodeValue;
    this.setState({
      [event.target.name]: event.target.value,
      //platenumname: sel_platenum
    });
  };

  handleDriverChange = event => {
    //var sel_drivername = event.nativeEvent.explicitOriginalTarget.nodeValue;
    this.setState({
      [event.target.name]: event.target.value,
      //drivername: sel_drivername
    });
  };

  handleCheckerChange = event => {
    //var sel_checkername = event.nativeEvent.explicitOriginalTarget.nodeValue;
    this.setState({
      [event.target.name]: event.target.value,
      //checkername: sel_checkername
    });
  };

  componentDidMount() {

    let pathClass = window.location.pathname.split('/').join(' ').trim();
    document.body.className = (pathClass) ? pathClass : 'home';
    var root = document.getElementsByTagName( 'html' )[0];
    root.className += ' manifesteditpage';

    let userNodeId = null;
    let userNodeName = null;

    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeId = JSON.parse(sessionStorage.getItem('userNodeId'));
    }

    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeName = sessionStorage.getItem('userNodeName');
    }

    manifest_ID = this.state.menifesttype;
    destination_ID = this.state.node_id;

    if(manifest_ID && manifest_ID != null && destination_ID && destination_ID != null){
      getEntityList(`transport_book?to_node=${destination_ID}&manifest_type_id=${manifest_ID}`, null).then((response) => {
        const {data} = response.data;
        //console.log(data);
        this.setState({smunumber: data.transport_no});
      });
    }

    // Get Destination data
    getEntityList('vehicle', null).then((response) => {
      const {data} = response.data;
      this.setState({vehicleTypeData: data});
    });

    getEntityList(`employee?type=4`, null).then((response) => {
      const {data} = response.data;
      this.setState({driveranccheckerlist: data});
    });

    // Get Menifest Type
    getEntityList('manifest_type', null).then((response) => {
      const {data} = response.data;
      this.setState({manifestTypevalue: data});
    });

    const {id} = this.props.match.params;
    this.props.edit !== true && this.setState({ready: true});
    this.props.edit &&
      getEntity(`manifest/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({
          ...data,
          ready: true,
          manifestno: data.manifest_no,
          menifesttype: data.manifest_type.manifest_type_id,
          node_id: data.destination_id,
          node_name: data.destination_name,
          vehicleid: data.vehicle_id,
          plate_number: data.police_no,
          driver_id: data.driver_id,
          driver_name: data.driver_name,
          checker_id: data.checker_id,
          checker_name: data.checker_name,
          baglistgetitem: data.manifest_detail,
        }, () => {
          // console.log('starat');
          // console.log(data);
          // console.log('end');
        });
      });
  }

  // handleTrigger = (actionvalue) => {
  //   alert(actionvalue);
  // };

  handleAddSubmit = (actionvalue) => {
    return this.setState({confirm: !this.state.confirm, manifest_st: actionvalue});
  };

  handleAction = (action) => {
    this.setState({confirm: false});
    action === 'yes' && !this.props.edit && this.saveEntity();
    action === 'yes' && this.props.edit && this.updateEntity();
  };
  updateEntity = () => {

    let userNodeId = null;
    let userNodeName = null;
    let bagarr = [];
    let bagdata = "";
    let baglistdata = this.state.baglistdatast;

    if(baglistdata.bag_id && baglistdata.bag_id != null){
      bagarr.push(baglistdata.bag_id);
    }else{
      bagarr.push('Unavailable');
    }

    if(baglistdata.weight && baglistdata.weight != null){
      bagarr.push(baglistdata.bag_no);
    }else{
      bagarr.push('Unavailable');
    }
    
    if(baglistdata.weight && baglistdata.weight != null){
      bagarr.push(baglistdata.weight);
    }else{
      bagarr.push('0');
    }

    if(baglistdata.connote_qty && baglistdata.connote_qty != null){
      bagarr.push(baglistdata.connote_qty);
    }else{
      bagarr.push('0');
    }

    if(baglistdata.destination && baglistdata.destination != null){
      bagarr.push(baglistdata.destination);
    }else{
      bagarr.push('Unavailable');
    }

    bagdata = bagarr.join(",");

    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeId = JSON.parse(sessionStorage.getItem('userNodeId'));
    }

    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeName = sessionStorage.getItem('userNodeName');
    }

    // console.log('tererere');
    // console.log(this.state.manifest_st);

    const {id} = this.props.match.params;
    if (this.state.menifesttype == 23) {
      putEntity(`manifest/${id}`, {
        manifest_no: this.state.manifestno,
        manifest_type_id: this.state.menifesttype,
        origin_id: userNodeId,
        origin_name: userNodeName,
        destination_name: 'Destination Id- '+this.state.node_id,
        destination_id: this.state.node_id,
        vehicle_id: this.state.vehicleid,
        //police_no: this.state.platenumname,
        driver_id: this.state.driver_id,
        //driver_name: this.state.drivername,
        checker_id: this.state.checker_id,
        //checker_name: this.state.checkername,
        bag: bagdata,
        status: this.state.manifest_st,
      }).then((response) => this.entitySubmitSuccess());
    }else{
      putEntity(`manifest/${id}`, {
        manifest_no: this.state.manifestno,
        manifest_type_id: this.state.menifesttype,
        origin_id: userNodeId,
        origin_name: userNodeName,
        destination_name: 'Destination Id- '+this.state.node_id,
        destination_id: this.state.node_id,
        bag: bagdata,
        status: this.state.manifest_st,
      }).then((response) => this.entitySubmitSuccess());
    }
  };
  saveEntity = () => {
    let userNodeId = null;
    let userNodeName = null;
    let bagarr = [];
    let bagdata = "";
    let baglistdata = this.state.baglistdatast;

    if(baglistdata.bag_id && baglistdata.bag_id != null){
      bagarr.push(baglistdata.bag_id);
    }else{
      bagarr.push('Unavailable');
    }

    if(baglistdata.weight && baglistdata.weight != null){
      bagarr.push(baglistdata.bag_no);
    }else{
      bagarr.push('Unavailable');
    }
    
    if(baglistdata.weight && baglistdata.weight != null){
      bagarr.push(baglistdata.weight);
    }else{
      bagarr.push('0');
    }

    if(baglistdata.connote_qty && baglistdata.connote_qty != null){
      bagarr.push(baglistdata.connote_qty);
    }else{
      bagarr.push('0');
    }

    if(baglistdata.destination && baglistdata.destination != null){
      bagarr.push(baglistdata.destination);
    }else{
      bagarr.push('Unavailable');
    }

    bagdata = bagarr.join(",");

    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeId = sessionStorage.getItem('userNodeId');
    }

    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeName = sessionStorage.getItem('userNodeName');
    }

    if (this.state.menifesttype == 23) {
      postEntity('manifest', {
        manifest_no: this.state.menifesttype,
        manifest_type_id: this.state.menifesttype,
        origin_id: userNodeId,
        origin_name: userNodeName,
        destination_name: 'Destination Id- '+this.state.node_id,
        destination_id: this.state.node_id,
        //vehicle_id: this.state.plate_number,
        //police_no: this.state.platenumname,
        driver_id: this.state.driver_id,
        //driver_name: this.state.drivername,
        checker_id: this.state.checker_id,
        //checker_name: this.state.checkername,
        bag: bagdata,
        status: this.state.manifest_st,

      }).then((response) => this.entitySubmitSuccess());
    }else{
      postEntity('manifest', {
        manifest_no: this.state.menifesttype,
        manifest_type_id: this.state.menifesttype,
        origin_id: userNodeId,
        origin_name: userNodeName,
        destination_name: 'Destination Id- '+this.state.node_id,
        destination_id: this.state.node_id,
        bag: bagdata,
        status: this.state.manifest_st,
      }).then((response) => this.entitySubmitSuccess());
    }
  };
  entitySubmitSuccess = () => {
    this.showNotification('manifest');
    this.props.history.push(`/transport/manifest`);
  };
  showNotification = (entity) => {
    ReactMaterialUiNotifications.showNotification({
      text: this.props.edit
        ? `Edit ${entity} success`
        : `Add ${entity} success`,
    });
  };

  render() {
    const {
      handleUpdate,
      handleResetvalue,
      handleChange,
      handleAddSubmit,
      handleAction,
    } = this;
    const {classes, edit, history, match, location} = this.props;
    const {
      ready,
      username,
      req_bagnumber,
      confirm,
      node_id,
      node_name,
      plate_number,
      destination_id,
      manifest_type_id,
      manifest_type_name,
      driver_id,
      driver_name,
      checker_id,
      checker_name,
      vehicleTypeData,
      manifestTypevalue,
      platenumberdata,
      loaderflag,
      msgg,
      driveranccheckerlist,
    } = this.state;

    const {rowdata, selected, baglistgetitem, baglistdatast} = this.state;
    const {url} = match;

    // if (Object.keys(baglistdatast).length > 0) {
    //   console.log('tattrtrtrtr');      
    //   console.log(baglistdatast);      
    // }else{
    //   console.log('baglistdatast');      
    //   console.log(baglistdatast);      
    // }

    return (
      <div className={'mainwrapedit'}>
        <div className={'editmaniheader'}>
          <div className={classes.headerWrapper}>
            <div className={classes.pageTitle}>
              <div className={classes.breadCrumbs}>
                Transport /
                <span className={classes.transactionBreadcrumbs}> Manifest /</span>
                <span className={classes.transactionBreadcrumbs}>
                  {edit ? `Edit Manifest` : `New Manifest`}
                </span>
              </div>
              <br />
              <p className={classes.titleWrapper}>
                {edit ? `Edit Manifest` : `New Manifest`}
              </p>
              <a href="javascript:window.print()" >Print</a>
            </div>
          </div>
        </div>

        <div className={classes.root}>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.formWrapper}>
                <Grid container>
                <Grid item xs={6} sm={6}>                  
                  <Typography type="headline" style={{fontSize: 18, color: "#424242"}}>
                    <strong>New Manifest</strong>
                  </Typography>
                  <br/>

                  <FormControl className={classes.textField} id="manifest_type">
                    <InputLabel htmlFor="menifesttypename">Type*</InputLabel>
                    {this.state.menifesttype != null ?
                      <Select
                        value={this.state.menifesttype}
                        onChange={this.handletypeChange}
                        inputProps={{
                          name: 'menifesttype',
                          id: 'menifesttypename',
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {manifestTypevalue.map((option, index) => (
                          <MenuItem key={option.manifest_type_id} value={option.manifest_type_id}>
                            {option.manifest_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                      :
                      <Select
                        value={'none'}
                        onChange={this.handletypeChange}
                        inputProps={{
                          name: 'menifesttype',
                          id: 'menifesttypename',
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {manifestTypevalue.map((option, index) => (
                          <MenuItem key={option.manifest_type_id} value={option.manifest_type_id}>
                            {option.manifest_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                    }  
                  </FormControl>                  
                  <FormControl className={classes.textField}>
                    {this.state.node_id != null ?
                      <ReferenceDropDown
                        className={classes.textField}
                        value={this.state.node_id && parseInt(node_id, 10)}
                        selectedValue={
                          node_name && {node_name: node_name, node_id: node_id}
                        }
                        remoteCall={getEntityList}
                        entity={'nodes'}
                        valueKey={'node_id'}
                        labelKey={'node_name'}
                        searchkey={'s'}
                        placeholder={'Destination'}
                        onUpdate={handleUpdate('node_id')}
                      />
                      :
                      <ReferenceDropDown
                        className={classes.textField}
                        value={'none'}
                        selectedValue={
                          node_name && {node_name: node_name, node_id: node_id}
                        }
                        remoteCall={getEntityList}
                        entity={'nodes'}
                        valueKey={'node_id'}
                        labelKey={'node_name'}
                        searchkey={'s'}
                        placeholder={'Destination'}
                        onUpdate={handleUpdate('node_id')}
                      />
                    }
                  </FormControl>
                  <FormControl className={classes.textField}>
                    <InputLabel htmlFor="menifestsmu">SMU#</InputLabel>
                    <Select
                      value={this.state.smunumber ? this.state.smunumber : 'Generate'}
                      inputProps={{
                        name: 'smuvalue',
                        id: 'menifestsmu',
                      }}
                    >
                    {this.state.smunumber ?
                      <MenuItem value="{this.state.smunumber}">{this.state.smunumber}</MenuItem>
                      :
                      <MenuItem value="Generate">Generate</MenuItem>
                    }
                    </Select>
                  </FormControl>

                </Grid>

                {this.state.menifesttype === 23 && (
                  <Grid item xs={6} sm={6}>
                      <Typography type="headline" style={{opacity: 0, fontSize: 18, color: "#424242"}}>
                        <strong>New Manifest</strong>
                      </Typography>
                      <br/>
                      <FormControl className={classes.textField}>
                        <InputLabel htmlFor="plate_number">Plate Number</InputLabel>
                        {this.state.plate_number != null ?
                          <Select
                            value={this.state.plate_number}
                            onChange={this.handlePlateChange}
                            inputProps={{
                              name: 'plate_number',
                              id: 'plate_number',
                            }}
                          >
                            {vehicleTypeData.map((option, index) => (
                              <MenuItem key={option.vehicle_id} value={option.police_no}>
                                {option.police_no}
                              </MenuItem>
                            ))}
                          </Select>
                          :
                          <Select
                            value={'none'}
                            onChange={this.handlePlateChangeAddNew}
                            inputProps={{
                              name: 'plate_number',
                              id: 'plate_number',
                            }}
                          >
                            {vehicleTypeData.map((option, index) => (
                              <MenuItem key={option.vehicle_id} value={option.police_no}>
                                {option.police_no}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      </FormControl>
                      <FormControl className={classes.textField}>
                        <InputLabel htmlFor="driver_id">Driver</InputLabel>
                        {this.state.driver_id != null ?
                          <Select
                            value={this.state.driver_id}
                            onChange={this.handleDriverChange}
                            inputProps={{
                              name: 'driver_id',
                              id: 'driver_id',
                            }}
                          >
                            {driveranccheckerlist.map((option, index) => (
                              <MenuItem key={option.employee_id} value={option.employee_id}>
                                {option.first_name} {option.last_name}
                              </MenuItem>
                            ))}
                          </Select>
                        : 
                        <Select
                          value={'none'}
                          onChange={this.handleDriverChange}
                          inputProps={{
                            name: 'driver_id',
                            id: 'driver_id',
                          }}
                        >
                          {driveranccheckerlist.map((option, index) => (
                            <MenuItem key={option.employee_id} value={option.employee_id}>
                              {option.first_name} {option.last_name}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      </FormControl>
                      <FormControl className={classes.textField}>
                        <InputLabel htmlFor="checker_id">Checker</InputLabel>
                        {this.state.checker_id != null ?
                          <Select
                            value={this.state.checker_id}
                            onChange={this.handleCheckerChange}
                            inputProps={{
                              name: 'checker_id',
                              id: 'checker_id',
                            }}
                          >
                            {driveranccheckerlist.map((option, index) => (
                              <MenuItem key={option.node_location['employee_id']} value={option.node_location['employee_id']}>
                                {option.node_location['node_name']}
                              </MenuItem>
                            ))}
                          </Select>
                          :
                          <Select
                            value={'none'}
                            onChange={this.handleCheckerChange}
                            inputProps={{
                              name: 'checker_id',
                              id: 'checker_id',
                            }}
                          >
                            {driveranccheckerlist.map((option, index) => (
                              <MenuItem key={option.node_location['employee_id']} value={option.node_location['employee_id']}>
                                {option.node_location['node_name']}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      </FormControl>

                      <br/>
                      <p></p>
                  </Grid>
                )}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={9} sm={9}>
              <Paper className={classes.formWrapper}>
                <Typography type="headline" style={{fontSize: 18, color: "#424242"}}>
                  <strong>{' '}
                  {edit ? `Edit bag` : `List of Bags`}</strong>
                </Typography>
                <div>
                  <FormControl className={classes.textField}>
                    <InputLabel htmlFor="req_bagnumber">Masukkan kode bag/ connote</InputLabel>
                    <Input
                      id="req_bagnumber"
                      type="text"
                      value={req_bagnumber}
                      onChange={this.handleChange('req_bagnumber')}
                    />
                    <Button style={{position: 'absolute', right: 0, top: 18}} variant="flat" color="primary" onClick={handleResetvalue}>
                      Reset
                    </Button>
                  </FormControl>
                  <br />
                  <div className={classes.tableWrapper}>
                  	{(loaderflag && rowdata != null && rowdata.length === 0) && <UserLinearProgress />}
                    <Table className={classes.table}>
                      <EnhancedInboundTableHead
                        numSelected={selected.length}
                      />

                      <TableBody>
                        {(Object.keys(baglistdatast).length > 0) &&
                          <TableRow
                            hover
                            tabIndex={-1}
                          >
                            <TableCell padding="none">{baglistdatast.bag_id ? baglistdatast.bag_id : '-'}</TableCell>
                            <TableCell>{baglistdatast.bag_no ? baglistdatast.bag_no : '-'}</TableCell>
                            <TableCell>{baglistdatast.weight ? baglistdatast.weight : 0}</TableCell>
                            <TableCell>{baglistdatast.connote_qty ? baglistdatast.connote_qty : 0}</TableCell>
                            <TableCell>{baglistdatast.destination ? baglistdatast.destination : '-'}</TableCell>
                          </TableRow>
                        }
                      	{baglistgetitem.map((baglistval, index) => (
                              <TableRow
                                hover
                                tabIndex={-1}
                                key={index}
                              >
                                <TableCell padding="none">{baglistval.bag_id ? baglistval.bag_id : '-'}</TableCell>
                                <TableCell>{baglistval.bag_no ? baglistval.bag_no : '-'}</TableCell>
                                <TableCell>{baglistval.total_weight ? baglistval.total_weight : 0}</TableCell>
                                <TableCell>{baglistval.total_connote ? baglistval.total_connote : 0}</TableCell>
                                <TableCell>{baglistval.bag_destination ? baglistval.bag_destination : '-'}</TableCell>
                              </TableRow>
                         ))
                        }
                      </TableBody>

                    </Table>
                  </div>
                </div>

                <ConfirmationDialog
                  yeslabel={edit ? 'Save' : 'Add'}
                  title={edit ? `Edit Manifest` : `New Manifest`}
                  description={
                    edit
                      ? `Are you sure you want to save this Manifest?`
                      : `Are you sure you want to add this Manifest?`
                  }
                  open={confirm}
                  handleAction={handleAction}
                />              
              </Paper>
            </Grid>
            
            <Grid item xs={3} sm={3}>
              <Paper className={classes.formWrapper}>
                <Typography type="headline" style={{fontSize: 18, color: "#424242"}}>
                  <strong>Manifest Information</strong>
                </Typography>
                <p>
                  Bag: <strong style={{color: "#333333"}}>3/15</strong>
                </p>
                <p>
                  Total Weight (Kg): <strong style={{color: "#333333"}}>100/300</strong>
                </p>
              </Paper>
            </Grid>
          </Grid>

          <div className={'actionbuttons'}>
            <div style={{marginLeft: '83%', marginTop: '2%'}}>
              {/*<Button
                style={{marginRight: 12}}
                onClick={() => history.goBack()}
                component={Link}
                to={`${match.url}`}
              >
                Finish
              </Button>*/}
              <Button variant="raised" color="primary" onClick={() => {this.handleAddSubmit('finish')}}>
                Finish
              </Button>
              <Button variant="raised" color="primary" style={{marginLeft: 20}} onClick={() => {this.handleAddSubmit('depart')}}>
                Depart
              </Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const removebt = {
  color: '#e62e28'
}

export default withStyles(styles)(AddMenifestListForm);