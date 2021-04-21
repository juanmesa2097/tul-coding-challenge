import { Product } from '../products/product.model';

export interface Cart {
  id: number;
  status: CartStatus;
}

export interface CartProduct {
  id: number;
  quantity: number;
  productId: Product['id'];
  cartId: Cart['id'];
}

export type CartStatus = 'Pending' | 'Completed';
