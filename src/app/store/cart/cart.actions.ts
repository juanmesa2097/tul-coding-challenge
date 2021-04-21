import { CartProduct } from './cart.model';

export class FetchCartProducts {
  static readonly type = '[CART] Get';
  constructor() {}
}

export class AddCartProduct {
  static readonly type = '[CART] Add';
  constructor(public payload: CartProduct) {}
}

export class RemoveCartProduct {
  static readonly type = '[CART] Remove';
  constructor(public payload: number) {}
}
