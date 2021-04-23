import { Cart } from './cart.model';

export namespace CartActions {
  enum ActionType {
    Fetch = '[Cart] Fetch',
    Add = '[Cart] Add',
  }

  export class Fetch {
    static readonly type = ActionType.Fetch;
    constructor(public payload: string) {}
  }

  export class Add {
    static readonly type = ActionType.Add;
    constructor(public payload: Cart) {}
  }
}
