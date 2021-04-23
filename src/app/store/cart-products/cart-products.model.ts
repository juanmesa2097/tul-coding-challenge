import { Product } from '../products/products.model';
import { User } from '../user/users.model';

export interface Cart {
  id: string;
  status: CartStatus;
  userId: User['id'];
}

export interface CartProduct {
  id: string;
  quantity: number;
  productId: Product['id'];
  cartId: Cart['id'];
  product?: Product;
  cart?: Cart;
}

export type CartStatus = 'Pending' | 'Completed';
