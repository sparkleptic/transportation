import React from 'react';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import {withStyles} from 'material-ui/styles';
export const styles = (theme) => ({
  root: {
    backgroundColor: '#CCCCCC',
    margin: 5,
    padding: 7,
    borderRadius: 12,
  },
  tooltip: {
    fontSize: 12,
    opacity: 1,
  },
});
const nodeColumn = (props) => {
  const more = props.data.length > 1 || false;
  return (
    <div>
    {
      more ?
        <span> {props.data[0].node_name} 
          <Tooltip
            classes={props.classes}
            title={<div>{props.data.map((node, index) => <span key={index}>{node.node_code} - {node.node_name}<br /></span>)}</div>}
            id="tooltip-top-start" placement="top-start"
          >
            <span> view {props.data.length - 1}+ more</span>
          </Tooltip>
        </span>
      : props.data[0] ?
        <span>{props.data[0].node_name}</span>
      :
      null
    }
    </div>
  );
};

export default withStyles(styles)(nodeColumn);
