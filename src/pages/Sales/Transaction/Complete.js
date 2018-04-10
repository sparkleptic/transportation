import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Typography, withStyles } from 'material-ui';
import {getTransaction} from '../../../actions/transcationAction';
import UserLinearprogress from '../../UserLinearprogress';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    transform: 'translateY(50%)',
  },
  thankYou: {
    fontSize: 80,
  },
  checkmark__circle: {
    strokeDasharray: 166,
    strokeDashoffset: 166,
    strokeWidth: 2,
    strokeMiterlimit: 10,
    stroke: '#7ac142',
    fill: 'none',
    animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
  },
  checkmark: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    display: 'block',
    strokeWidth: 2,
    stroke: '#fff',
    strokeMiterlimit: 10,
    margin: '10% auto',
    boxShadow: 'inset 0px 0px 0px #7ac142',
    animation: 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',
  },
  checkmark__check: {
    transformOrigin: '50% 50%',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
  },
  '@keyframes stroke': {
    '100%': {
      strokeDashoffset: 0,
    }
  },
  '@keyframes scale': {
    '0%, 100%': {
      transform: 'none',
    },
    '50%': {
      transform: 'scale3d(1.1, 1.1, 1)',
    },
  },
  '@keyframes fill': {
    '100%': {
      boxShadow: 'inset 0px 0px 0px 30px #7ac142',
    },
  },
});
class TransactionComplete extends Component {
  state = {
  };
  componentDidMount = () => {
    this.props.id && this.props.getTransaction(this.props.id);

    document.addEventListener('keydown', this._handleKeyDown);
  }
  _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 32:
        document.removeEventListener('keydown', this._handleKeyDown);
        this.props.history.push('/new-transactions');
        event.preventDefault();
        break;
      default:
        break;
    }
  }
  render() {
    const {classes} = this.props;
   return (
      <div className={classes.root}>
      {
        this.props.transaction &&
        <div>
          <div>
            <div style={{width: 50, display: 'inline-block'}}>
              <svg className={classes.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={classes.checkmark__circle} cx="26" cy="26" r="25" fill="none" />
                <path className={classes.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          </div>
          <Typography className={classes.thankYou}>Thank You</Typography>
          <Typography>Transaction Number : {this.props.transaction.transaction_number}</Typography>
          <Typography>Customer: {this.props.transaction.connotes[0].from_name}</Typography>
        </div>
      }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: (id) => dispatch(getTransaction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionComplete));
