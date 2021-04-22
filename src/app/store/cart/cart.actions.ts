import { CartProduct } from './cart.model';

export namespace CartActions {
  enum ActionType {
    Fetch = '[Cart] Fetch',
    Add = '[Cart] Add',
    Remove = '[Cart] Remove',
  }

  export class Fetch {
    static readonly type = ActionType.Fetch;
    constructor() {}
  }

  export class Add {
    static readonly type = ActionType.Add;
    constructor(public payload: CartProduct) {}
  }

  export class Remove {
    static readonly type = ActionType.Remove;
    constructor(public payload: string) {}
  }
}
