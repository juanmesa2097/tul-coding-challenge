import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CartActions } from './cart.actions';
import { CartProduct } from './cart.model';

interface CartStateModel {
  cartProducts: CartProduct[];
  isLoading: boolean;
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cartProducts: [],
    isLoading: false,
  },
})
@Injectable()
export class CartState {
  @Selector()
  static fetchCartProducts(state: CartStateModel): CartProduct[] {
    return state.cartProducts;
  }

  @Selector()
  static isLoading(state: CartStateModel): boolean {
    return state.isLoading;
  }

  @Action(CartActions.Fetch)
  fetch({
    getState,
    patchState,
    setState,
  }: StateContext<CartStateModel>): void {}

  @Action(CartActions.Add)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: CartActions.Add,
  ): void {
    const state = getState();
    patchState({ cartProducts: [...state.cartProducts, payload] });
  }

  @Action(CartActions.Remove)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: CartActions.Remove,
  ): void {
    const state = getState();
    patchState({
      cartProducts: state.cartProducts.filter(
        (product) => product.id !== payload,
      ),
    });
  }
}
