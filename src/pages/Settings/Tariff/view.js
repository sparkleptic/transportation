import React from 'react';
import Create from './create';

// eslint-disable-next-line react/display-name
export default (props) => {
  return <Create viewOnly={true} edit={true} {...props} />;
};
