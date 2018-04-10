import React from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  Chip,
  GridList,
  GridListTile,
} from 'material-ui';
import {ChevronRight} from 'material-ui-icons';
import {withStyles} from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import _ from 'lodash';

const Styles = (theme) => ({
  drawerPaper: {
    top: 65,
    height: '100%',
    width: 260,
    zIndex: 0,
    border: 'none',
  },
  upperDrawer: {
    fontWeight: 600,
    fontSize: 16,
  },
  wrapper: {
    marginLeft: 18,
  },
  label: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.46)',
  },
  titleLabel: {
    fontSize: 14,
    fontWeight: 600,
  },
  tile: {
    marginLeft: 23,
  },
  divider: {
    backgroundColor: '#95989a',
    width: 224,
    marginTop: 9,
    border: 'solid 1px rgba(255, 255, 254, 0.64)',
  },
  chipsWrapper: {
    margin: 2,
    display: 'inline-block',
  },
  chips: {
    backgroundColor: '#424242',
    color: '#fafafa',
  },
  chipDeleteIcon: {
    color: '#ffffff',
  },
  // rootTable: {
  //   width: '100%',
  //   marginTop: theme.spacing.unit * 3,
  //   overflowX: 'auto',
  // },
  table: {
    maxWidth: 250,
  },
  tableCell: {
    maxWidth: 18,
  },
  placeTableCell: {
    maxWidth: 10,
  },
  subdistrict_name: {color: '#FF0000'},
  district_name: {color: '#FF00FF'},
  city_name: {color: '#00FF00'},
});

// const handleClick = (e, key) => {
//   // const { selected } = this.state;
//   // const selectedIndex = selected.indexOf(key);
//   // let newSelected = [];

//   // if (selectedIndex === -1) {
//   //   newSelected = newSelected.concat(selected, key);
//   // } else if (selectedIndex === 0) {
//   //   newSelected = newSelected.concat(selected.slice(1));
//   // } else if (selectedIndex === selected.length - 1) {
//   //   newSelected = newSelected.concat(selected.slice(0, -1));
//   // } else if (selectedIndex > 0) {
//   //   newSelected = newSelected.concat(
//   //     selected.slice(0, selectedIndex),
//   //     selected.slice(selectedIndex + 1),
//   //   );
// }

// this.setState({ selected: newSelected });
// }
const SearchDrawer = (props) => {
  const {
    open,
    handleDrawer,
    classes,
    destReducer,
    data,
    fetchAlmtPenerima,
  } = props;
  const fetchedAlmtData = (item) =>
    fetchAlmtPenerima(item);
  const TableCellHasData = () => {
    return data.map((item, index) => {
      const {
        subdistrict_name,
        district_name,
        city_name,
        province_name,
        country_name,
        zip_code,
        tariff_code,
      } = item;
      const concatedItem =
        '' +
        subdistrict_name +
        ' ' +
        district_name +
        ' ' +
        city_name;
      return (
        <TableRow
          key={index}
          hover
          onMouseDown={(e) => {
            fetchedAlmtData(item);
            handleDrawer('openSearchDrawer');
          }}
          tabIndex={-1}
          style={{cursor: 'pointer'}}
        >
          <TableCell classes={{root: classes.placeTableCell}} padding="none">
            {concatedItem}
          </TableCell>
          <TableCell classes={{root: classes.tableCell}} padding="none">
            {zip_code}
          </TableCell>
          <TableCell classes={{root: classes.tableCell}} padding="none">
            {tariff_code}
          </TableCell>
        </TableRow>
      );
    });
  };

  // const almtFieldPatt = /\s/g
  // const splittingAlmtVal = destReducer.almtPenerima && destReducer.almtPenerima.split(almtFieldPatt)
  // let clonedAlmtVal = _.clone(splittingAlmtVal)
  // const deleteChip = (index) => {
  //   console.log(clonedAlmtVal)
  //   clonedAlmtVal.splice(index, 1)
  //   return PrintChips()
  // }
  // function PrintChips() {
  //   console.log('rendering')
  //   return clonedAlmtVal && !clonedAlmtVal.length <= 0 &&  clonedAlmtVal.map((item, i) => (
  //     <div key={i} className={classes.chipsWrapper}>
  //       <Chip
  //         label={item}
  //         classes={{ root: classes.chips, deleteIcon: classes.chipDeleteIcon }}
  //         onDelete={() => deleteChip(i)}
  //       />
  //     </div>
  //   ))
  // }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={open}
      elevation={25}
    >
      <div>
        <div>
          <IconButton onClick={() => handleDrawer('openSearchDrawer')}>
            <ChevronRight />
          </IconButton>
          <label className={classes.upperDrawer}>
            Search Post & Tariff Code
          </label>
        </div>
        <div className={classes.wrapper}>
          {/* <List>
            <label className={classes.label}>Add a tag *</label>
            <br />
          </List> */}
          <Divider className={classes.divider} />
          <List>
            <GridList cols={3} cellHeight="auto">
              <GridListTile cols={3} className={classes.titleLabel}>
                <GridList cols={3} cellHeight="auto">
                  <GridListTile cols={3}>
                    {
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              classes={{paddingDefault: classes.placeTableCell}}
                              padding="none"
                            >
                              Place
                            </TableCell>
                            <TableCell padding="none">Zip</TableCell>
                            <TableCell
                              classes={{root: classes.tableCell}}
                              padding="none"
                            >
                              Tariff
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data && data.length > 0 ? (
                            TableCellHasData()
                          ) : (
                            <TableRow>
                              <TableCell
                                classes={{root: classes.tableCell}}
                                padding="none"
                                style={{
                                  textAlign: 'center',
                                  fontWeight: 'lighter',
                                }}
                              >
                                <label>Data Not Found</label>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    }
                  </GridListTile>
                </GridList>
              </GridListTile>
            </GridList>
            <Divider className={classes.divider} />
          </List>
        </div>
      </div>
    </Drawer>
  );
};
//   className={classes.list}
// className={classes.list}
// className={classes.drawerInner}
//  className={classes.drawerHeader}
export default withStyles(Styles)(SearchDrawer);
