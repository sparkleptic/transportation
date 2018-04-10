import React from 'react';
import {Route, Link} from 'react-router-dom';
import {Toolbar, Typography, Tooltip, IconButton, Button} from 'material-ui';
import {Add} from 'material-ui-icons';
import classNames from 'classnames';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import withStyles from 'material-ui/styles/withStyles';
import BaseTabForm from '../form';

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.dark,
          //   backgroundColor: lighten(theme.palette.secondary.light, 0.4),
        }
      : {
          //   color: lighten(theme.palette.secondary.light, 0.4),
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  // classNam
});

let EnhancedTableToolbar = (props) => {
  const {numSelected, classes, url} = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <Route exact path={`${url}/new-base-tariff`} component={BaseTabForm} />
      <Button
        variant="raised"
        style={{margin: '0% 2%'}}
        color="primary"
        component={Link}
        to={`${url}/new-base-tariff`}
      >
        <Add />&nbsp;New
      </Button>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
export default EnhancedTableToolbar;
