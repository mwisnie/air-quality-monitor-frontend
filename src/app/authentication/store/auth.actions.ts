import { Action } from '@ngrx/store';
import { User } from 'src/app/model/User';

export const ATTEMPT_SIGNUP = 'ATTEMPT_SIGNUP';
export const ATTEMPT_SIGNIN = 'ATTEMPT_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ID = 'SET_ID';
// export const SET_ACCOUNT_DATA = 'SET_ACCOUNT_DATA';

export class AttemptSignup implements Action {
  readonly type = ATTEMPT_SIGNUP;

  constructor(public payload: { username: string, password: string, email: string }) { }
}

export class AttemptSignin implements Action {
  readonly type = ATTEMPT_SIGNIN;

  constructor(public payload: { username: string, password: string }) { }
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) { }
}

export class SetId implements Action {
  readonly type = SET_ID;

  constructor(public payload: string) { }
}

// export class SetAccountData implements Action {
//   readonly type = SET_ACCOUNT_DATA;

//   constructor(public payload: User) {}
// }

export type AuthActions = AttemptSignup | AttemptSignin | Signup | Signin
                          | Logout | SetToken | SetId;
