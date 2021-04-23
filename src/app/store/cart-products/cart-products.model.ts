import { Cart } from '../cart/cart.model';
import { Product } from '../products/products.model';

export interface CartProduct {
  id?: string;
  quantity: number;
  productId: Product['id'];
  cartId: Cart['id'];
}
