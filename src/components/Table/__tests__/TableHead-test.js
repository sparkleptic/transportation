// @flow

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableHead from '../TableHead';

import {TableSortLabel} from 'material-ui/Table';

Enzyme.configure({adapter: new Adapter()});

let onSortClick;
let columnList;

describe('Table Head', () => {
  beforeEach(() => {
    onSortClick = jest.fn();
    columnList = [
      {
        id: 'transaction',
        numeric: false,
        label: 'Transaction #',
        sortable: true,
      },
      {
        id: 'from_name',
        numeric: false,
        label: 'Customer Name',
        sortable: true,
      },
    ];
  });
  it('should rendered properly', () => {
    let rendered = shallow(
      <TableHead columnList={columnList} onSortClick={onSortClick} />,
    );
    expect(rendered.find(TableSortLabel).length).toBe(columnList.length);
  });

  it('should change the sorting if user click the same table head', () => {
    let rendered = shallow(
      <TableHead columnList={columnList} onSortClick={onSortClick} />,
    );

    rendered
      .find(TableSortLabel)
      .at(0)
      .simulate('click');
    let state = rendered.state();
    expect(state).toEqual({
      activeOrder: {
        columnID: columnList[0].id,
        sortType: 'asc',
      },
    });
    expect(onSortClick).toHaveBeenCalledWith('asc', columnList[0].id);

    rendered
      .find(TableSortLabel)
      .at(0)
      .simulate('click');
    state = rendered.state();
    expect(state).toEqual({
      activeOrder: {
        columnID: columnList[0].id,
        sortType: 'desc',
      },
    });
    expect(onSortClick).toHaveBeenCalledWith('desc', columnList[0].id);
  });

  it('should sort with default order, which is ascending, if user click different table head ', () => {
    let rendered = shallow(
      <TableHead columnList={columnList} onSortClick={onSortClick} />,
    );

    rendered
      .find(TableSortLabel)
      .at(0)
      .simulate('click');
    let state = rendered.state();
    expect(state).toEqual({
      activeOrder: {
        columnID: columnList[0].id,
        sortType: 'asc',
      },
    });
    expect(onSortClick).toHaveBeenCalledWith('asc', columnList[0].id);

    rendered
      .find(TableSortLabel)
      .at(1)
      .simulate('click');
    state = rendered.state();
    expect(state).toEqual({
      activeOrder: {
        columnID: columnList[1].id,
        sortType: 'asc',
      },
    });
    expect(onSortClick).toHaveBeenCalledWith('asc', columnList[1].id);
  });
});
