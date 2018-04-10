import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
/**
 * Very simple wrapper for autocomplete to fetch remote data as user type
 */

class Option extends React.Component {
  handleClick = (event) => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const {children, isFocused, isSelected, onFocus} = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}
function SelectWrapped(props) {
  const {classes, ...other} = props;

  return (
    <Select
      disabled={true}
      label="Select"
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={(arrowProps) => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={(valueProps) => {
        const {children} = valueProps;
        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = (theme) => ({
  root: {
    // marginBottom: 6,
    width: '100%',
    // maxWidth: 500,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class ReferenceDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultValue: '', selectedItem: '', value: '', refData: []};
  }
  /**
   * init with first data when component mount
   */
  componentDidMount = () => {
    this.fetchData();
  };
  componentWillReceiveProps = (props) => {
    this.setState({defaultValue: props.value});

    if(props.entity !== this.props.entity) {
      this.fetchData(null, props.entity);
    }

  };
  fetchData = (value, entity) => {
    this.props
      .remoteCall(
        entity || this.props.entity,
        value ? {[this.props.searchkey]: value} : null,
      )
      .then((response) => {
        let {data} = response.data;
        
        if(typeof data === 'undefined' && response.data) {
          data = response.data
        }

        this.setState({refData: data});
      });
  };
  handleChange = (value) => {
    value && this.fetchData(value);
  };
  handleChangeSingle = (value) => {
    this.props.onUpdate(value);
  };
  render() {
    const {defaultValue} = this.state;
    const {
      selectedValue,
      classes,
      valueKey,
      labelKey,
      placeholder,
      disabled = false,
      labelstyle,
      selectOptions = {}
    } = this.props;
    var optionData = this.state.refData;
    selectedValue && (optionData = [selectedValue].concat(optionData));

    const inputProps = {
      classes,
      value: defaultValue,
      valueKey: valueKey,
      labelKey: labelKey,
      onChange: this.handleChangeSingle,
      placeholder: placeholder,
      floatingLabelText: 'Floating Label Text',
      instanceId: 'react-select-single',
      id: 'react-select-single',
      name: 'react-select-single',
      simpleValue: true,
      options: optionData,
      onInputChange: this.handleChange,
      onCloseResetsInput: false,
      onBlurResetsInput: false,
      ...selectOptions
    };
    return (
      <div className={classes.root}>
        {defaultValue !== '' ? (
          <InputLabel
            style={labelstyle ? labelstyle : {
              position: 'absolute',
              transform: 'translate(0, 1.5px) scale(0.75)',
            }}
          >
            {placeholder}
          </InputLabel>
        ) : null}
        <Input
          style={{marginTop: 14}}
          fullWidth
          disabled={disabled}
          inputComponent={SelectWrapped}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

ReferenceDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReferenceDropDown);
