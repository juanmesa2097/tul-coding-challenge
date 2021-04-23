import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateName } from '../state-name.enum';
import { CartActions } from './cart-products.actions';
import { CartProduct } from './cart-products.model';

interface CartStateModel {
  cartProducts: CartProduct[];
  isLoading: boolean;
}

@State<CartStateModel>({
  name: StateName.Cart,
  defaults: {
    cartProducts: [],
    isLoading: false,
  },
})
@Injectable()
export class CartState {
  constructor(private firestore: AngularFirestore) {}

  @Selector()
  static fetchCartProducts(state: CartStateModel): CartProduct[] {
    return state.cartProducts;
  }

  @Selector()
  static isLoading(state: CartStateModel): boolean {
    return state.isLoading;
  }

  @Action(CartActions.Fetch)
  async fetch({
    getState,
    patchState,
  }: StateContext<CartStateModel>): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    const s = await this.firestore
      .collection<CartProduct>(FirestoreCollection.CartProducts)
      .snapshotChanges()
      .toPromise();

    console.log('xxxxxxxxxxxxxxxxxx', s);
  }

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
