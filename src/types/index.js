// @flow
// import type {Store as ReduxStore} from 'redux';
//
// import type {Reducers} from '../reducers';
//
// // Reducers
// export type Filters = {
//   +readyStatus: string,
//   +err: any,
//   +list: Array<Object>,
// };
//
// export type Home = {
//   +readyStatus: string,
//   +err: any,
//   +list: Array<Object>,
// };
//
// export type UserInfo = {
//   +[userId: string]: {
//     +readyStatus: string,
//     +err: any,
//     +info: Object,
//   },
// };
//
// // State
// type ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
// export type ReduxState = $ObjMap<Reducers, ExtractFunctionReturn>;
//
// // Action
// export type Action =
//   | {type: 'FILTERS_REQUESTING'}
//   | {type: 'FILTERS_SUCCESS', data: Array<Object>}
//   | {type: 'FILTERS_FAILURE', err: any}
//   | {type: 'USER_REQUESTING', userId: string}
//   | {type: 'USER_SUCCESS', userId: string, data: Object}
//   | {type: 'USER_FAILURE', userId: string, err: any};
//
// export type Dispatch = (
//   action: Action | ThunkAction | PromiseAction | Array<Action>,
// ) => any;
// export type GetState = () => ReduxState;
// export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
// export type PromiseAction = Promise<Action>;
//
// // Store
// export type Store = ReduxStore<ReduxState, Action>;
