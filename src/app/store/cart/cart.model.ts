export class CartStateModel {
  cartProducts!: CartProduct[];
}

export interface Cart {
  id: number;
  status: CartStatus;
}

export interface CartProduct {
  id: number;
  productId: number;
  cartId: number;
  quantity: number;
}

export type CartStatus = 'Pending' | 'Completed';
