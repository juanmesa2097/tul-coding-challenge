import { CartProduct } from './cart-products.model';

export namespace CartProductsActions {
  enum ActionType {
    Fetch = '[CartProducts] Fetch',
    FetchByIds = '[Products] FetchByIds',
    Add = '[CartProducts] Add',
    Remove = '[CartProducts] Remove',
  }

  export class Fetch {
    static readonly type = ActionType.Fetch;
    constructor(public payload: string) {}
  }

  export class FetchByIds {
    static readonly type = ActionType.FetchByIds;
    constructor(public payload: string[]) {}
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
