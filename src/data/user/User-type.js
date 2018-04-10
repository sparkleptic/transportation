// @flow

export type User = {
  active: string,
  created_at: string,
  deleted: string,
  effective_date_from: string,
  effective_date_to: string,
  email: string,
  email_verified: string,
  id: string,
  is_logged_in: number,
  name: string,
  phone: string,
  phone_verified: string,
  updated_at: string,
  user_id: number,
  username: string,
  node: Array<string>,
  permission: Array<string>,
};

export type UserAction =
  | {
      type: 'GET_USER_DETAIL_REQUESTED',
      userID: string,
    }
  | {
      type: 'GET_USER_DETAIL_SUCCEED',
      user: User,
    };
