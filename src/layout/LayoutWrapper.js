import React from 'react';
import {Route} from 'react-router-dom';
import qs from 'query-string';

const LayoutWrapper = ({component: Component, layout: Layout, ...rest}) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        let {match, location} = props;
        let searchParsed = (location.search && qs.parse(location.search)) || {};
        let componentProps = match.params || {};
        let content = (
          <Component {...props} {...componentProps} {...searchParsed} />
        );
        if (Layout) {
          return <Layout {...props}>{content}</Layout>;
        }
        return content;
      }}
    />
  );
};
export default LayoutWrapper;
