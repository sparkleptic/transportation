import {last} from 'lodash';
export const makeBreadcrumbs = (location) => {
  const splittedLocation = location.pathname
    .split('/')
    .filter((item) => item.length > 0)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  const childRoutesSplitted =
    splittedLocation.length !== 2 &&
    last(splittedLocation)
      .split('-')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  const concatedRoutes =
    childRoutesSplitted &&
    splittedLocation.slice(0, 2).concat(childRoutesSplitted);
  return {
    counter: splittedLocation,
    hasOneChild: {
      base: splittedLocation[0],
      firstChild: splittedLocation[1],
    },
    hasTwoChild: {
      base: concatedRoutes[0],
      firstChild: concatedRoutes[1],
      secondChild:
        concatedRoutes.length > 4
          ? concatedRoutes[2] +
            ' ' +
            concatedRoutes[3] +
            ' ' +
            concatedRoutes[4]
          : concatedRoutes[2] + ' ' + concatedRoutes[3],
    },
  };
};
