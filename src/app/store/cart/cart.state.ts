import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddCartProduct, RemoveCartProduct } from './cart.actions';
import { CartProduct, CartStateModel } from './cart.model';

@State({
  name: 'cart',
  defaults: {
    cartProducts: [],
  },
})
export class CartState {
  @Selector()
  static getCartProducts(state: CartStateModel): CartProduct[] {
    return state.cartProducts;
  }

  @Action(AddCartProduct)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddCartProduct,
  ): void {
    const state = getState();
    patchState({ cartProducts: [...state.cartProducts, payload] });
  }

  @Action(RemoveCartProduct)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: RemoveCartProduct,
  ): void {
    const state = getState();
    patchState({
      cartProducts: state.cartProducts.filter(
        (product) => product.id !== payload,
      ),
    });
  }
}
