import React from 'react';
import {Add} from 'material-ui-icons';
import {Route, Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {
  Chip,
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  Icon,
  TextField,
} from 'material-ui';


import {styles} from '../../../css';

import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../../components/Table';

class List extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rowIdInEditMode : false,
      rowEdit_kgbefore: '',
      rowEdit_kgafter: ''
    };
  }

  _setEditRowId = ( row ) => {
    this.setState({
      rowIdInEditMode: row.id,
      rowEdit_kgbefore: row.kgbefore,
      rowEdit_kgafter: row.kgafter,
    })
  }

  _reset_setEditRowId = (row) => {
    this.setState({
      rowIdInEditMode: false,
      rowEdit_kgbefore: '',
      rowEdit_kgafter: ''
    })
  }

  _updateRow = ( row ) => {
    this.setState({
      rowIdInEditMode: false,
      rowEdit_kgbefore: '',
      rowEdit_kgafter: ''
    })
  }

  _renderStatus = ( row ) => {
    if( row.status == 'on process'){
      return <Chip label="ON PROCESS"/>
    } else if( row.status == 'done'){
      return <Chip label="DONE" />
    }
    return null;
  }

  keyPress(e){
    if(e.keyCode == 69){
      e.preventDefault()
    }
   }

  render() {


    let columnList = [
  {
    id: 'connote_number',
    numeric: false,
    label: 'AWB',
    sortable: true,
  },
  {
    id: 'created_on',
    numeric: false,
    label: 'Kg Before',
    sortable: true,
  },
  {
    id: 'to_tariff_code',
    numeric: false,
    label: 'Kg After',
    sortable: true,
  },
  {
    id: 'chargeable_weight',
    numeric: true,
    label: 'Status',
    sortable: true,
  },
  {
    id: 'action',
    label: '',
  }
];

let rowsPerPage = 10;
let activePage = 1;
let total = 100;


// console.log('-----state')
// console.log('-----state')
// console.log( this.state )

    return (
      <div>
        <TableTitle
          title="Packing Kayu List"
          // searchTextInput={searchTextInput}
          // onSearchTextChange={onSearchTextInputChanged}
          // onSearchSubmit={(searchTextInput) => {
          //   fetchData(
          //     searchTextInput,
          //     rowsPerPage,
          //     activeSortColumn,
          //     activeSortType,
          //     activePage + 1,
          //     activeNode,
          //   );
          // }}
        />
        <Table>

        <TableHead
            columnList={columnList}
            // onSortClick={(
            //   activeSortType: SortType,
            //   activeSortColumn: string,
            // ) => {
            //   fetchData(
            //     searchTextInput,
            //     rowsPerPage,
            //     activeSortColumn,
            //     activeSortType,
            //     activePage + 1,
            //     activeNode,
            //   );
            //   this.setState({activeSortColumn, activeSortType});
            // }}
          />

        <TableBody
            data={this.props.data}
            render={(row) => {
              return (
                <TableRow>
                  <TableCell>{row.awb}</TableCell>
                  <TableCell style={{width:'150px'}}>
                    {
                      this.state.rowIdInEditMode == row.id
                      ?
                      (
                        <TextField
                          value={this.state.rowEdit_kgbefore}
                          onChange={(e) => { this.setState({ rowEdit_kgbefore: e.target.value})}}
                          matchrgin="normal"
                          type="number"
                          onKeyDown={this.keyPress}
                          style={{width:'80px'}}
                        />
                      )
                      :
                      row.kgbefore
                    }
                  </TableCell>
                  <TableCell style={{width:'150px'}}>
                    {
                      this.state.rowIdInEditMode == row.id
                      ?
                      (
                        <TextField
                          value={this.state.rowEdit_kgafter}
                          onChange={(e) => { this.setState({ rowEdit_kgafter: e.target.value})}}
                          matchrgin="normal"
                          type="number"
                          onKeyDown={this.keyPress}
                          style={{width:'80px'}}
                        />
                      )
                      :
                      row.kgafter
                    }
                  </TableCell>
                  <TableCell style={{width:'150px'}}>{this._renderStatus(row)}</TableCell>
                  <TableCell>
                    {
                      this.state.rowIdInEditMode == row.id
                      ?
                      (
                        <div>
                          <Button onClick={() =>this._updateRow(row)}>
                            Update
                          </Button>
                          <br/>
                          <Button onClick={() =>this._reset_setEditRowId(row)}>
                            Cancel
                          </Button>
                        </div>
                      )
                      :
                      (
                        <Button onClick={() =>this._setEditRowId(row)}>
                          <i className="material-icons">mode_edit</i>
                        </Button>
                      )
                    }
                  </TableCell>
                </TableRow>
              );
            }}
          />

          <TableFooter
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            dataLength={total}
            onChangePage={(a) => {
              //console.log('AAAA')
             // console.log(a)
            //   // fetchData(
            //   //   searchTextInput,
            //   //   rowsPerPage,
            //   //   activeSortColumn,
            //   //   activeSortType,
            //   //   activePage + 1,
            //   //   activeNode,
            //   // );
            //   // this.setState({activePage});
            }}
            onChangeRowsPerPage={(b) => {
              //console.log('BB')
              //console.log(b)
            //   // fetchData(
            //   //   searchTextInput,
            //   //   rowsPerPage,
            //   //   activeSortColumn,
            //   //   activeSortType,
            //   //   1,
            //   //   activeNode,
            //   // );
            //   // this.setState({rowsPerPage, activePage: 0});
            }}
          />

        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(List);