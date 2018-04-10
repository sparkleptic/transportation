// @flow

import React from 'react';
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

declare type ReactNode =
  | null
  | string
  | number
  | React.Element<*>
  | Array<string | number | React.Element<*>>;

type ObjectOf<T> = {[key: string]: T};

declare type JSONData =
  | null
  | string
  | number
  | boolean
  | Array<JSONData>
  | ObjectOf<JSONData>;

type FetchJSON = (
  url: string,
  params: {[key: string]: string},
) => Promise<FetchReturn>;

type FetchReturn = ObjectOf<JSONData>;

type Fetch = {
  get: (url: string, params: {[key: string]: mixed}) => any,
  post: (url: string, params: {[key: string]: mixed}) => any,
  put: (url: string, params: {[key: string]: mixed}) => any,
};

type SortType = 'asc' | 'desc';

type Notification = {
  id: number,
  text: string,
  onClose?: () => void,
};

declare type StyleSheetType = StyleObj;
