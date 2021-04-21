import { Product } from '../products/product.model';

export interface Cart {
  id: string;
  status: CartStatus;
}

export interface CartProduct {
  id: string;
  quantity: number;
  productId: Product['id'];
  cartId: Cart['id'];
}

export type CartStatus = 'Pending' | 'Completed';
