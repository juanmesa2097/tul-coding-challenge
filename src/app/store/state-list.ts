import { CartProductsState } from './cart-products/cart-products.state';
import { CartState } from './cart/cart.state';
import { ProductsState } from './products/products.state';
import { UserState } from './user/users.state';

export const stateList = [
  UserState,
  ProductsState,
  CartState,
  CartProductsState,
];
