import React from 'react';
import {Chip} from 'material-ui';
import {GridList, GridListTile} from 'material-ui';

const ServiceResult = (props) => {
  const {classes, allReducer, _CW} = props;
  return (
    <GridList cols={3} cellHeight="auto">
      <GridListTile cols={2} className={classes.kodeNWeight}>
        <GridList cols={2} cellHeight="auto">
          <GridListTile>
            {allReducer && allReducer.length > 0
              ? allReducer.map((data, index) => (
                  <Chip
                    label={data.package.OtherInfoData.service}
                    key={index}
                    classes={{root: classes.chips}}
                  />
                ))
              : ''}
          </GridListTile>
          <GridListTile className={classes.label}>
            {allReducer && allReducer.length > 0 ? <label>CGK</label> : ''}
          </GridListTile>
        </GridList>
      </GridListTile>
      <GridListTile style={{float: 'right', marginLeft: -13, marginTop: 8}}>
        <label style={{fontSize: 16, fontWeight: 'bold'}}>
          {allReducer && allReducer.length > 0 ? `${_CW} Kg(s)` : ''}
        </label>
      </GridListTile>
    </GridList>
  );
};
export default ServiceResult;
