import React from 'react';
import {LinearProgress} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';

const styles = () => ({
  rootLinear: {
    width: '100%',
  },
});

const UserLinearprogress = (props) => {
  const {completedLinear, bufferLinear, classes} = props;

  return <LinearProgress mode="query" />;
};

export default withStyles(styles)(UserLinearprogress);
