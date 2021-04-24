import { LoginCredentials, User } from './users.model';

export namespace UserActions {
  enum ActionType {
    SignIn = '[Users] SignIn',
    SignUp = '[Users] SignUp',
    SignOut = '[Users] SignOut',
  }

  export class SignIn {
    static readonly type = ActionType.SignIn;
    constructor(public payload: LoginCredentials) {}
  }

  export class SignUp {
    static readonly type = ActionType.SignUp;
    constructor(public payload: User) {}
  }

  export class SignOut {
    static readonly type = ActionType.SignOut;
  }
}
