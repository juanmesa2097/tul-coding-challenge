import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { deepClone } from '@app/@core/utils';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateName } from '../state-name.enum';
import { CartProductsActions } from './cart-products.actions';
import { CartProduct } from './cart-products.model';

interface CartProductsStateModel {
  cartProducts: CartProduct[];
  isLoading: boolean;
  error: string | null;
}

@State<CartProductsStateModel>({
  name: StateName.CartProducts,
  defaults: {
    cartProducts: [],
    isLoading: false,
    error: null,
  },
})
@Injectable()
export class CartProductsState {
  constructor(private firestore: AngularFirestore) {}

  @Selector()
  static fetchCartProducts({
    cartProducts,
  }: CartProductsStateModel): CartProduct[] {
    return cartProducts;
  }

  @Selector()
  static isLoading({ isLoading }: CartProductsStateModel): boolean {
    return isLoading;
  }

  @Selector()
  static cartProductsCount({ cartProducts }: CartProductsStateModel): number {
    return cartProducts.length;
  }

  @Action(CartProductsActions.Fetch)
  fetch(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.Fetch,
  ): Observable<CartProduct[]> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    const cartRef = this.firestore
      .collection(FirestoreCollection.Cart)
      .doc(payload).ref;

    return this.firestore
      .collection<CartProduct>(FirestoreCollection.CartProducts, (ref) =>
        ref.where('cartId', '==', cartRef),
      )
      .valueChanges()
      .pipe(
        tap((products) => {
          patchState({
            ...state,
            cartProducts: deepClone<CartProduct[]>(products),
            isLoading: false,
          });
        }),
      );
  }

  @Action(CartProductsActions.Add)
  async add(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.Add,
  ): Promise<void> {
    const state = getState();
    patchState({ ...state, isLoading: true });
    console.log(payload);
    try {
      await this.firestore.collection(FirestoreCollection.CartProducts).add({
        ...payload,
        cartId: this.firestore
          .collection(FirestoreCollection.Cart)
          .doc(payload.cartId).ref,
        productId: this.firestore
          .collection(FirestoreCollection.Products)
          .doc(payload.productId).ref,
      });

      patchState({
        ...state,
        cartProducts: [...state.cartProducts, payload],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      patchState({
        ...state,
        cartProducts: [],
        isLoading: false,
        error: error.message,
      });
    }
  }

  @Action(CartProductsActions.Remove)
  remove(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.Remove,
  ): void {
    const state = getState();
    patchState({
      cartProducts: state.cartProducts.filter(
        (product) => product.id !== payload,
      ),
    });
  }
}
