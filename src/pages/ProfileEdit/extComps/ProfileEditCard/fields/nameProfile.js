import React from 'react';
import {Grid, FormControl, IconButton} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import SearchPeople from '../../Dialogs/searchPeeps';

const NameProfile = (props) => {
  const {
    classes,
    item,
    handleOpenDialog,
    handleChange,
    openSearchDialog,
    dataProfile,
    handleChangeText,
    handleRowClick,
  } = props;

  return (
    console.log("item.namejytjjyjyjfcdjyjcjygfjgfj", item),
    <Grid container spacing={0}>
      <Grid item>
        <FormControl className={classes.textField}>
          {' '}

          <InputLabel
            FormControlClasses={{focused: classes.inputLabelFocused}}
            htmlFor="focusedInput"
            className={classes.inputLabel}
          >
            {item.label}
          </InputLabel>
          <Input
            type="text"
            name={item.name}
            onChange={handleChange}
            value={item.value}
            // classes={{inkbar: classes.inputInkbarFocused}}
            id="focusedInput"
            // inputProps={{
            //   readOnly: props.readOnly,
            //   disabled: props.readOnly,
            // }}
          />
          {openSearchDialog && (
            <SearchPeople
              openDialog={openSearchDialog}
              handleChangeText={handleChangeText}
              handleRowClick={handleRowClick}
              handleOpenDialog={handleOpenDialog}
              dataProfile={dataProfile}
            />
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default NameProfile;
