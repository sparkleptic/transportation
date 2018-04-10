import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import PropTypes, {array} from 'prop-types';
import {Paper} from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import withStyles from 'material-ui/styles/withStyles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import {styles} from '../../../css';
import {getEntityList, postEntity} from '../../../../actions/entity';

class Permission extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      permissiondata: [],
      access_module: [
        'access_view',
        'access_add',
        'access_edit',
        'access_delete',
        'access_all',
      ],
    };
  }
  componentWillReceiveProps = (nextprops) => {
    return getEntityList(`permission/${nextprops.role_id}`, null).then(
      (response) => {
        const {data} = response.data;
        data.map((p) => {
          if (!p.access_module) {
            p.access_module = {
              access_view: 0,
              access_add: 0,
              access_edit: 0,
              access_delete: 0,
              access_all: 0,
            };
          }
          let all = 0;
          Object.keys(p.access_module).map(
            (e) => p.access_module[e] === 1 && ++all,
          );
          p.access_module['access_all'] = all === 4 ? 1 : 0;
          return p;
        });
        return this.setState({permissiondata: data});
      },
    );
  };
  componentDidMount() {
    this.state.data.length === 0 && this.getList(this.props.entity);

    return getEntityList(`permission/197`, null).then(
      (response) => {
        const {data} = response.data;
        data.map((p) => {
          if (!p.access_module) {
                p.access_module = {
              access_view: 0,
              access_add: 0,
              access_edit: 0,
              access_delete: 0,
              access_all: 0,
            };
          }
          let all = 0;
          Object.keys(p.access_module).map(
            (e) => p.access_module[e] === 1 && ++all,
          );
          p.access_module['access_all'] = all === 4 ? 1 : 0;
          return p;
        });
        return this.setState({permissiondata: data});
      },
    );

  }
  getList = (entity, data) => {
    return getEntityList('permission', data).then((response) => {
      const {data} = response.data;
      return this.setState({data});
    });
  };
  handleSelectClick = (index, access, checked) => {
    let permissiondata = this.state.permissiondata;
    let access_module = permissiondata[index].access_module;
    if (access === 'access_all') {
      Object.keys(access_module).map(
        (e) => (access_module[e] = checked ? 1 : 0),
      );
    } else {
      access_module[access] = checked ? 1 : 0;
      if (!checked) {
        access_module['access_all'] = 0;
      }
      let all = 0;
      Object.keys(access_module).map((e) => access_module[e] === 1 && ++all);

      access_module['access_all'] = all === 4 ? 1 : 0;
    }
    permissiondata.access_module = access_module;
    this.setState({permissiondata});
    var postData = [];
    permissiondata.map((n) => postData.push(this.getDataItem(n)));
    postEntity(`permission`, {
      role_id: this.props.role_id,
      role_access: JSON.stringify(postData),
    }).then((response) => {});
  };

  getDataItem = (item) => {
    var data = {
      module_id: item.module_id,
      access_view: item.access_module.access_view,
      access_add: item.access_module.access_add,
      access_edit: item.access_module.access_edit,
      access_delete: item.access_module.access_delete,
    };
    return data;
  };
  render() {
    const {classes} = this.props;
    const {data, permissiondata, access_module} = this.state;
    return (
      <Grid xs={8} item>
        <Paper className={classes.paper}>
          {permissiondata.length && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Menu</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Add</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>All</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((n, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{n.module_name}</TableCell>
                    {access_module.map((p) => (
                      <TableCell key={p}>
                        <Checkbox
                          onChange={(event, checked) =>
                            this.handleSelectClick(index, p, checked)
                          }
                          checked={permissiondata[index].access_module[p] === 1}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Grid>
    );
  }
}
Permission.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, {withTheme: true})(Permission);
