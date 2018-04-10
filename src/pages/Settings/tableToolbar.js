import React from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, Typography, Tooltip, IconButton, Button, Icon} from 'material-ui';
import {Add,InsertDriveFile} from 'material-ui-icons';
import classNames from 'classnames';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import withStyles from 'material-ui/styles/withStyles';
import SearchField from '../Searchfield';
import ExcelExportBtn from '../../components/ExcelExportBtn';

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
  const {numSelected, classes, url, entity, columnData, handleChange, basaetariffdata} = props;

  let baseteriff_col = [];
  let baseteriff_finaldata = [];
  var tariff_col = columnData.columnData;

  {tariff_col.length > 0 &&
                    tariff_col.map((teriff_colvalue, index) => {
    baseteriff_col.push(teriff_colvalue.label);
  })}

  // {basaetariffdata.length > 0 &&
  //     basaetariffdata.map((teriff_datavalue, index) => {
  //   baseteriff_data.push([teriff_datavalue.id, teriff_datavalue.origin, teriff_datavalue.destination, teriff_datavalue.service_code, teriff_datavalue.price_1, teriff_datavalue.min_weight, teriff_datavalue.max_weight]);
  // })}

  // {basaetariffdata.length > 0 &&
  //     basaetariffdata.map((teriff_datavalue, index) => {
  //   baseteriff_data.push([teriff_datavalue.id, teriff_datavalue.special_tariff_name, teriff_datavalue.effective_date_from, teriff_datavalue.effective_date_to]);
  // })}

  {basaetariffdata.length > 0 &&
    basaetariffdata.map((n, index) => {
      let baseteriff_data = [];
      {tariff_col.map((column, index) => {
        var h = '';
        try {
          column.key2
            ? (h = n[column.id][column.key][column.key2])
            : column.key
              ? (h = n[column.id][column.key])
              : (h = n[column.id]);
        } catch (e) {}
        h = (column.type === 'date' && h) ? h = moment(h).format('DD MMM YYYY') : h;
          {baseteriff_data.push(h)}
      })
    }
    {baseteriff_finaldata.push(baseteriff_data)}
    
  })}


  // console.log('start');
  // console.log(baseteriff_col);
  // console.log(baseteriff_finaldata);
  // console.log('end');

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.spacer} />
      <SearchField handleChange={handleChange} />
      <Button
        variant="raised"
        style={{margin: '0% 1%'}}
        color="primary"
        component={Link}
        to={`${url}/${entity}/create`}
      >
        <Add />&nbsp;New
      </Button>
      {/*<Button
        style={{margin: '0% 1%', padding: '10px 20px'}}
        color="primary"
        component={Link}
        to={`${url}/${entity}/create`}
      >
        <InsertDriveFile />&nbsp;Export
      </Button>*/}
      <ExcelExportBtn
        columnList={baseteriff_col}
        data={baseteriff_finaldata}
        filename="basetariff_list.xlsx"
        orgName="JNT"
        title="base tariff list"
      />
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
export default EnhancedTableToolbar;
