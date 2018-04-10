import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Paper, TextField, Button} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import Grid from 'material-ui/Grid';
//
import ConfirmationDialog from '../../../components/confirmationDialog';
import ReactMaterialUiNotifications from '../../../components/ReactMaterialUiNotifications';
//import {Notification} from '../../../components/ReactMaterialUiNotifications'
import {getEntity, postEntity, postJsonEntity, putEntity, putFormDataEntity,showError} from '../../../actions/entity';
import entities from './entities';
import {styles} from '../../css';
import moment from 'moment';
import { JSON_to_URLEncoded} from './utils';
import WarningDialog from '../../../components/warningDialog'
class CreateForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      confirm: false, 
      Component: this.getForm(), 
      formdata: [], 
      error :'', showDialog: false}
      ;
  }

  componentDidMount(){
    const {id, entity} = this.props.match.params;
    this.props.edit &&
      getEntity(entity + `/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({existingTariff: data});
      })
      .catch(err => this.setErr(err))
  }
  updateEntity = () => {
    const {id, entity} = this.props.match.params;
    let {
      formdata
    } = this.state;

    let newFormData = {
      ...formdata,
      dateTo: moment(formdata.dateTo).format("YYYY-MM-DD h:mm:ss"),
      dateFrom: moment(formdata.dateFrom).format("YYYY-MM-DD h:mm:ss")
    }
    
    putEntity(entity + `/${id}`, newFormData)
    .then((response) =>
      this.entitySubmitSuccess(),
    )
    .catch(err => this.setErr(err))
  };


  setErr = (err) => {
    let error = showError(err.response.data.status.form_error)
    this.setState({
      error ,
      showDialog : true
    })
  }
  saveEntity = () => {
    const {entity} = this.props.match.params;
    let {
      formdata
    } = this.state;

    let newFormData = {
      ...formdata,
      dateTo: moment(formdata.dateTo).format("YYYY-MM-DD h:mm:ss"),
      dateFrom: moment(formdata.dateFrom).format("YYYY-MM-DD h:mm:ss")
    }
    postEntity(entity, {...newFormData}).then((response) =>
      this.entitySubmitSuccess(),
    )
    .catch(err => this.setErr(err))
  };
  entitySubmitSuccess = () => {
    const {entity} = this.props.match.params;
    this.showNotification(entity);
    this.props.history.push(`/settings/tariff`);
  };
  showNotification = (entity) => {
    ReactMaterialUiNotifications.showNotification({
      text: this.props.edit
        ? `Edit ${entity} success`
        : `Add ${entity} success`,
    });
  };
  getForm = () => {
    const {entity} = this.props.match.params;
    return entities[entity].createForm;
  };

  handleEntityChange = (name, value) => {
    const {formdata} = this.state;
    formdata[name] = value;
    this.setState({formdata});
  };

  handleFormChange = (formdata) => {
    this.setState({formdata});
  }

  handleEntitySubmit = () => {
    return this.setState({confirm: !this.state.confirm});
  };
  handleEntityAction = (action) => {
    this.setState({confirm: false});
    action === 'yes' && !this.props.edit && this.saveEntity();
    action === 'yes' && this.props.edit && this.updateEntity();
  };
  switchToViewOnlyMode = () => {
    const {entity, id} = this.props.match.params;
    this.props.history.push(`/settings/tariff/${entity}/view/${id}`);
  }
  render() {
    const {handleEntitySubmit, handleEntityChange, handleEntityAction, handleFormChange} = this;
    const {classes, edit, match, history, viewOnly} = this.props;
    const {confirm, Component, formdata, existingTariff} = this.state;
    //console.log(Notification, "Notification")
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Settings /
              <span className={classes.transactionBreadcrumbs}> Tariff / </span>
              <span className={classes.transactionBreadcrumbs}>
                {edit
                  ? `Edit ${match.params.entity}`
                  : `New ${match.params.entity}`}
              </span>
            </div>
            <br />
            <p className={classes.titleWrapper}>
              {edit
                ? `Edit ${match.params.entity}`
                : `New ${match.params.entity}`}
            </p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>
              {
                !viewOnly && edit ?
                  <div style={{
                    marginBottom: 20
                  }}>
                    <Button variant="raised" color="primary" onClick={this.switchToViewOnlyMode}>
                      Switch to view only mode
                    </Button>
                  </div>
                : null
              }
              <Typography type="headline">
                {' '}
                {edit
                  ? `Edit ${match.params.entity}`
                  : `New ${match.params.entity}`}{' '}
              </Typography>
              <Component
                edit={edit}
                formdata={formdata}
                classes={classes}
                onUpdateForm={handleEntityChange}
                onUpdateFullForm={handleFormChange}
                existingTariff={existingTariff}
                viewOnly={viewOnly}
              />
              <WarningDialog
                text= {this.state.error}
                open={this.state.showDialog}
                title={'Error'}
                handleModal={() => this.setState({ showDialog : false})}
              />
              <ConfirmationDialog
                yeslabel={edit ? 'Save' : 'Add'}
                title={
                  edit
                    ? `Edit ${match.params.entity}`
                    : `New ${match.params.entity}`
                }
                description={
                  edit
                    ? `Are you sure you want to save this ${
                        match.params.entity
                      } ?`
                    : `Are you sure you want to add this ${
                        match.params.entity
                      } ?`
                }
                open={confirm}
                handleAction={handleEntityAction}
              />
              <div style={{marginLeft: '83%', marginTop: '2%'}}>
                <Button
                  style={{marginRight: 12}}
                  onClick={() => history.goBack()}
                  component={Link}
                  to={`${match.url}`}
                >
                  Cancel
                </Button>
                {!viewOnly ? <Button variant="raised" color="primary" onClick={handleEntitySubmit}>
                  {edit ? 'Save' : 'Add'}
                </Button> : null }
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CreateForm);
