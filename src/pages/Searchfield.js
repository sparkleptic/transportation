import React from 'react';
import {TextField} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';

const Styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginTop: -theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
const SearchField = (props) => {
  const {classes, handleChange} = props;
  return (
    <TextField
      id="search"
      label="Search"
      type="search"
      className={classes.textField}
      margin="normal"
      onChange={handleChange}
    />
  );
};

export default withStyles(Styles)(SearchField);
