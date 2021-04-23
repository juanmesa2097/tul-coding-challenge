import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { deepClone } from '@app/@core/utils';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { StateName } from '../state-name.enum';
import { CartActions } from './cart.actions';
import { Cart } from './cart.model';

interface CartStateModel {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

@State<CartStateModel>({
  name: StateName.Cart,
  defaults: {
    cart: null,
    isLoading: false,
    error: null,
  },
})
@Injectable()
export class CartState {
  constructor(private firestore: AngularFirestore) {}

  @Selector()
  static fetchCart({ cart }: CartStateModel): Cart | null {
    return cart;
  }

  @Selector()
  static isLoading({ isLoading }: CartStateModel): boolean {
    return isLoading;
  }

  @Action(CartActions.Fetch)
  fetch(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: CartActions.Fetch,
  ): Observable<Cart> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    const userRef = this.firestore
      .collection(FirestoreCollection.Users)
      .doc(payload).ref;

    return this.firestore
      .collection<Cart>(FirestoreCollection.Cart, (ref) =>
        ref.where('userId', '==', userRef).limit(1),
      )
      .valueChanges()
      .pipe(
        mergeMap((carts) => carts),
        tap((cart) => {
          console.log(cart);
          patchState({
            ...state,
            cart: deepClone<Cart>(cart),
            isLoading: false,
          });
        }),
      );
    // patchState({ ...state, cart: s, isLoading: false });
  }

  @Action(CartActions.Add)
  async add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: CartActions.Add,
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    try {
      await this.firestore.collection(FirestoreCollection.Cart).add({
        ...payload,
        userId: this.firestore
          .collection(FirestoreCollection.Users)
          .doc(payload.userId).ref,
      });

      patchState({ ...state, cart: payload, isLoading: false, error: null });
    } catch (error) {
      patchState({
        ...state,
        cart: null,
        isLoading: false,
        error: error.message,
      });
    }
  }
}
