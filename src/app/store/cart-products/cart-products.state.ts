import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { deepClone } from '@app/@core/utils';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../products/products.model';
import { StateName } from '../state-name.enum';
import { CartProductsActions } from './cart-products.actions';
import { CartProduct } from './cart-products.model';

interface CartProductsStateModel {
  cartProducts: CartProduct[];
  productsInCart: Product[];
  shipping: number;
  isLoading: boolean;
  error: string | null;
}

@State<CartProductsStateModel>({
  name: StateName.CartProducts,
  defaults: {
    cartProducts: [],
    productsInCart: [],
    shipping: 10000,
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
  static fetchProductsInCart({
    productsInCart,
  }: CartProductsStateModel): Product[] {
    return productsInCart;
  }

  @Selector()
  static isLoading({ isLoading }: CartProductsStateModel): boolean {
    return isLoading;
  }

  @Selector()
  static cartProductsCount({ cartProducts }: CartProductsStateModel): number {
    return cartProducts.length;
  }

  @Selector()
  static getShippingCost({ shipping }: CartProductsStateModel): number {
    return shipping;
  }

  @Selector()
  static getSubTotal({ productsInCart }: CartProductsStateModel): number {
    return productsInCart.reduce((acum, product) => acum + product.price, 0);
  }

  @Selector()
  static getGrandTotal({
    productsInCart,
    shipping,
  }: CartProductsStateModel): number {
    const price = productsInCart.reduce(
      (acum, product) => acum + product.price,
      0,
    );

    return price + shipping;
  }

  @Action(CartProductsActions.Fetch)
  fetch(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.Fetch,
  ): Observable<CartProduct[]> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    return this.firestore
      .collection<CartProduct>(FirestoreCollection.CartProducts, (ref) =>
        ref.where('cartId', '==', payload),
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

  @Action(CartProductsActions.FetchByIds)
  fetchByIds(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.FetchByIds,
  ): Observable<Product[]> {
    const state = getState();
    console.log(payload);
    const fetchedProducts = payload.map((id) =>
      this.firestore
        .collection<Product>(FirestoreCollection.Products, (ref) =>
          ref.where('id', '==', id),
        )
        .doc(id)
        .valueChanges(),
    );

    return combineLatest<Product[]>(fetchedProducts).pipe(
      tap((products) => {
        patchState({
          ...state,
          productsInCart: deepClone<Product[]>(products),
        });
      }),
    );
  }

  @Action(CartProductsActions.Add)
  add(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.Add,
  ): void {
    const state = getState();
    patchState({ ...state, isLoading: true });

    const { cartId, productId } = payload;

    const id = this.firestore.createId();

    this.firestore
      .collection(FirestoreCollection.CartProducts)
      .doc(id)
      .set({
        ...payload,
        cartId,
        productId,
      })
      .then(() => {
        patchState({
          ...state,
          cartProducts: deepClone<CartProduct[]>([
            ...state.cartProducts,
            payload,
          ]),
          isLoading: false,
          error: null,
        });
      });
  }

  @Action(CartProductsActions.Remove)
  remove(
    { getState, patchState }: StateContext<CartProductsStateModel>,
    { payload }: CartProductsActions.Remove,
  ): void {
    const state = getState();

    patchState({
      ...state,
      isLoading: true,
    });

    const productQuery = this.firestore.collection(
      FirestoreCollection.CartProducts,
      (ref) => ref.where('productId', '==', payload.trim()),
    );

    productQuery
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }
}
