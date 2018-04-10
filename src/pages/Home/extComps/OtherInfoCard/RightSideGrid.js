import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import RightSide from './fields/right';

const Styles = (theme) => ({
  inputLabelFocused: {
    color: 'rgb(50, 57, 144)',
  },
  inputLabel: {
    marginLeft: theme.spacing.unit * 3,
  },
  inputInkbarFocused: {
    '&:after': {
      backgroundColor: 'rgb(50, 57, 144)',
    },
  },
});

const rightSideGrid = (props) => {
  return <RightSide {...props} />;
};
export default withStyles(Styles)(rightSideGrid);
