import React from 'react';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid/Grid';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import UserLinearprogress from '../../../UserLinearprogress';
import {getEntityList} from '../../../../actions/entity';
import {styles} from '../../../css';

class EnhancedUserTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {data: [], loading: true};
  }
  componentDidMount() {
    this.state.data.length === 0 && this.getList(this.props.entity);
  }
  getList = (entity, data) => {
    this.setState({loading: true});
    return getEntityList('usergroups', {l: -1}).then((response) => {
      const {data} = response.data;
      return this.setState({data, loading: false});
    });
  };

  handleClick = (event, id) => {
    this.setState({selected: id});
    this.props.onSelectItem(id);
  };

  render() {
    const {classes} = this.props;
    const {loading, data, selected} = this.state;
    return (
      <div>
        <Grid md={12} item>
          <div className={classes.tableWrapper}>
            {loading && <UserLinearprogress />}
            <Table className={classes.table}>
              <TableBody>
                {data &&
                  data.map((n) => (
                    <TableRow
                      onClick={(event) => this.handleClick(event, n.role_id)}
                      hover
                      key={n.role_id}
                      selected={n.role_id === selected}
                    >
                      <TableCell>{n.role_name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
      </div>
    );
  }
}

EnhancedUserTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedUserTable);
