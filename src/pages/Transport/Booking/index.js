import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Dispatch } from '../../../storeTypes';
import Button from 'material-ui/Button';
import EnhancedTable from '../../../components/EnhancedTable'
import EnhancedToolbar from '../../../components/EnhancedToolbar'

import Add from 'material-ui-icons/Add';

import columns from './columns';
import { styles as baseStyles } from '../../css';

const styles = (theme) => ({
  ...baseStyles(theme),
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

export class BookingList extends React.Component {

  render() {
    const { classes, match, booking } = this.props;

    return (
      <div className={classes.root}>
        <EnhancedToolbar
          navs={['Transport', 'Booking']}
        >
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            component={Link}
            to={`${match.url}/create`}
          >
            <Add className={classes.leftIcon} />
            New
          </Button>
        </EnhancedToolbar>
        <EnhancedTable
          {...booking}
          className={classes.card}
          title="Booking List"
          columns={columns}
          page={booking.page - 1}
          onClickRow={data => {
            console.log(data)
          }}
          onChangeSearch={data => {
            this.update(data)
          }}
          onClickSearch={() => {
            this.fetch(booking)
          }}
          onChangePage={data => {
            this.fetch({
              ...booking,
              page: data.page,
            })
          }}
          onChangeRowsPerPage={data => {
            this.fetch({
              ...booking,
              rowsPerPage: data.rowsPerPage,
            })
          }}
        />
      </div>
    );
  }

  componentWillMount() {
    const { booking } = this.props

    if (booking.data.length === 0) {
      this.fetch(booking);
    }
  }

  componentWillReceiveProps(props) {
    const { booking, header } = props

    if (this.props.header.currentNode !== header.currentNode) {
      this.fetch({
        ...booking,
        activeNode: header.currentNode,
      });
    }
  }

  update(opts) {
    const { dispatch } = this.props

    dispatch({
      ...opts,
      type: 'UPDATE_BOOKING',
    })
  }

  fetch(opts) {
    const { dispatch, header } = this.props

    dispatch({
      activeNode: header.currentNode,
      ...opts,
      type: 'GET_BOOKING_LIST_REQUESTED',
    })
  }
}

function mapStateToProps({ booking, header }) {
  return { booking, header };
}

export default withStyles(styles)(connect(mapStateToProps)(BookingList));
