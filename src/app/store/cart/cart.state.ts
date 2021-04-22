import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateName } from '../state-name.enum';
import { CartActions } from './cart.actions';
import { CartProduct } from './cart.model';

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
  fetch({
    getState,
    patchState,
  }: StateContext<CartStateModel>): Observable<CartProduct[]> {
    patchState({ ...getState(), isLoading: true });

    return this.firestore
      .collection<CartProduct>(FirestoreCollection.CartProducts)
      .valueChanges()
      .pipe(
        tap((cartProducts) => patchState({ cartProducts, isLoading: false })),
      );
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
