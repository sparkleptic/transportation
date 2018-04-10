import React        from  'react';
import Toolbar      from  'material-ui/Toolbar';
import Typography   from  'material-ui/Typography';
import PropTypes    from  'prop-types';
import {withStyles} from  'material-ui/styles';
import classNames from 'classnames';

const toolbarStyles = (theme) => ({
  root: {
    padding: 0,
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
  title: {
    fontSize:20,
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = (props) => {

  const { numSelected, classes } = props;

  return (
    <Toolbar className={ classNames(classes.root, { [classes.highlight]: numSelected > 0 })} >
      <div >
        <Typography className={classes.title} type="title">Pick Up Schedule List</Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


export default  EnhancedTableToolbar;