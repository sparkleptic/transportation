// @flow

export type ErrorMessage = {
  title: string,
  description: string,
  showBackButton?: boolean,
};

export const errorMessage: {[key: string]: ErrorMessage} = {
  [`500`]: {
    title: 'Internal Server Error',
    description:
      'Oops, something went wrong. Please contact our customer line at xxx-xxxxx',
  },
  [`404`]: {
    title: 'Page not found',
    description: 'The page that you requested not found.',
    showBackButton: true,
  },
};
