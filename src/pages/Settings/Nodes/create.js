import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Paper, TextField, Button} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import Grid from 'material-ui/Grid';
import ConfirmationDialog from '../../../components/confirmationDialog';
import ReactMaterialUiNotifications from '../../../components/ReactMaterialUiNotifications';
import {getEntity, postEntity, putEntity} from '../../../actions/entity';
import entities from './entities';
import {styles} from '../../css';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      Component: this.getForm(),
      formdata: [],
      inited: false,
    };
  }
  componentDidMount() {
    const {id, entity} = this.props.match.params;
    this.props.edit &&
      getEntity(entity + `/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({formdata: data, inited: true});
      });
  }
  updateEntity = () => {
    const {id, entity} = this.props.match.params;
    putEntity(entity + `/${id}`, this.state.formdata).then((response) =>
      this.entitySubmitSuccess(),
    );
  };
  saveEntity = () => {
    const {entity} = this.props.match.params;
    postEntity(entity, this.state.formdata).then((response) =>
      this.entitySubmitSuccess(),
    );
  };
  entitySubmitSuccess = () => {
    const {entity} = this.props.match.params;
    this.showNotification(entity);
    this.props.history.push(`/settings/nodes`);
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
  handleEntitySubmit = () => {
    return this.setState({confirm: !this.state.confirm});
  };
  handleEntityAction = (action) => {
    this.setState({confirm: false});
    action === 'yes' && !this.props.edit && this.saveEntity();
    action === 'yes' && this.props.edit && this.updateEntity();
  };
  render() {
    const {handleEntitySubmit, handleEntityChange, handleEntityAction} = this;
    const {classes, edit, match, history} = this.props;
    const {confirm, Component, formdata, inited} = this.state;
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Settings /
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                Geolocation /{' '}
              </span>
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
              <Typography type="headline">
                {' '}
                {edit
                  ? `Edit ${match.params.entity}`
                  : `New ${match.params.entity}`}{' '}
              </Typography>
              {edit ? (
                inited && (
                  <Component
                    edit={edit}
                    formdata={formdata}
                    classes={classes}
                    onUpdateForm={handleEntityChange}
                  />
                )
              ) : (
                <Component
                  edit={edit}
                  formdata={formdata}
                  classes={classes}
                  onUpdateForm={handleEntityChange}
                />
              )}

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
                <Button raised color="primary" onClick={handleEntitySubmit}>
                  {edit ? 'Save' : 'Add'}
                </Button>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Create);
