// @flow

import React from 'react';
import Downshift from 'downshift';
import {
  Typography,
  TextField,
  Paper,
  Icon,
  IconButton,
  Modal,
} from 'material-ui';
import {InputAdornment} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {View, Image, StyleSheet, ActivityIndicator, Text} from 'react-native';

import themeColors from '../../../constants/colors';

import femaleEmployeeIcon from '../../../assets/icons/globalSearch/female_employee.png';
import maleEmployeeIcon from '../../../assets/icons/globalSearch/male_employee.png';
import nodeIcon from '../../../assets/icons/globalSearch/node.png';
import vehicleIcon from '../../../assets/icons/globalSearch/vehicle.png';
import connoteIcon from '../../../assets/icons/globalSearch/connote.png';

import type {
  GlobalSearchSuggestionItemType,
  GlobalSearchSuggestionItem,
} from '../../../data/globalSearch/GlobalSearch-type';

type Props = {
  suggestions: Array<GlobalSearchSuggestionItem>,
  isFetchingSuggestions: boolean,
  onRequestSuggestions: (textInput: string) => void,
  onClose: () => void,
  resetSuggestion: () => void,
  onMenuSelected: (suggestion: GlobalSearchSuggestionItem) => void,
};

type SuggestionParams = {
  suggestion: GlobalSearchSuggestionItem,
  index: number,
  itemProps: Object,
  highlightedIndex: number,
  selectedItem: string,
};

function getIcon(type: GlobalSearchSuggestionItemType) {
  switch (type) {
    case 'employee_male': {
      return maleEmployeeIcon;
    }
    case 'employee_female': {
      return femaleEmployeeIcon;
    }
    case 'node': {
      return nodeIcon;
    }
    case 'vehicle': {
      return vehicleIcon;
    }
    case 'connote': {
      return connoteIcon;
    }
    case 'customer': {
      // TODO: TBD
      return maleEmployeeIcon;
    }
    default:
      return connoteIcon;
  }
}

function renderSuggestion(params: SuggestionParams) {
  const {suggestion, index, itemProps, highlightedIndex, selectedItem} = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === suggestion.name;

  let iconSource = getIcon(suggestion.type);

  return (
    <MenuItem
      {...itemProps}
      key={`${suggestion.type}${suggestion.id}`}
      selected={isHighlighted}
      component="div"
      style={{
        ...StyleSheet.flatten(styles.menuItem),
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      <Image source={iconSource} style={styles.iconType} />
      <View style={styles.nameContainer}>
        <Typography
          variant="subheading"
          style={StyleSheet.flatten(styles.name)}
        >
          {suggestion.name}
        </Typography>
        <Typography variant="body1" style={StyleSheet.flatten(styles.desc)}>
          {suggestion.desc}
        </Typography>
      </View>
    </MenuItem>
  );
}

class GlobalSearchTextField extends React.Component<Props, void> {
  _debounceTimeout: number;

  componentWillUnmount() {
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
    this.props.resetSuggestion();
  }

  render() {
    let {
      suggestions,
      onRequestSuggestions,
      onMenuSelected,
      onClose,
      isFetchingSuggestions,
      resetSuggestion,
    } = this.props;

    return (
      <Downshift
        onInputValueChange={(inputValue: string) => {
          if (this._debounceTimeout) {
            clearTimeout(this._debounceTimeout);
          }
          if (inputValue) {
            this._debounceTimeout = setTimeout(() => {
              onRequestSuggestions(inputValue);
            }, 500);
          } else {
            resetSuggestion();
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
        }) => {
          return (
            <div style={{...StyleSheet.flatten(styles.root)}}>
              <View style={styles.centerItem}>
                <TextField
                  {...getInputProps({
                    placeholder: 'Search here...',
                    autoFocus: true,
                    fullWidth: true,
                    onKeyDown: (event) => {
                      if (event.key === 'Enter') {
                        let selectedSuggestion = suggestions[highlightedIndex];
                        if (selectedSuggestion) {
                          onMenuSelected(selectedSuggestion);
                        }
                      }
                    },
                    InputProps: {
                      style: {
                        ...StyleSheet.flatten(styles.textInput),
                        '&:focus': {
                          borderColor: themeColors.theme,
                          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                        },
                      },
                      startAdornment: (
                        <View style={styles.centerItem}>
                          <InputAdornment position="start">
                            <Icon
                              style={StyleSheet.flatten(styles.textInputIcon)}
                            >
                              search
                            </Icon>
                          </InputAdornment>
                        </View>
                      ),
                      endAdornment: (
                        <View
                          style={[styles.centerItem, {flexDirection: 'row'}]}
                        >
                          {isFetchingSuggestions && (
                            <InputAdornment position="end">
                              <ActivityIndicator animating />
                            </InputAdornment>
                          )}
                          <InputAdornment position="end">
                            <IconButton onClick={onClose}>
                              <Icon
                                style={{
                                  ...StyleSheet.flatten(styles.textInputIcon),
                                  color: 'grey',
                                }}
                              >
                                close
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        </View>
                      ),
                    },
                  })}
                />
              </View>
              {isOpen && (
                <Paper square>
                  {suggestions.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      highlightedIndex,
                      selectedItem,
                      itemProps: getItemProps({
                        item: suggestion.name,
                        onClick: () => {
                          onMenuSelected(suggestion);
                        },
                      }),
                    }),
                  )}
                </Paper>
              )}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 70,
  },
  textInputIcon: {
    fontSize: 30,
    color: themeColors.theme,
    marginLeft: 10,
    marginRight: 10,
  },
  iconType: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 20,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuItem: {
    height: 50,
    padding: 10,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {marginRight: 5, fontWeight: 'bold'},
  desc: {
    color: 'grey',
    paddingTop: 3,
  },
});

export default GlobalSearchTextField;
