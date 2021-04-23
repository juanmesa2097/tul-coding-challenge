import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { deepClone } from '@app/@core/utils';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateName } from '../state-name.enum';
import { ProductsActions } from './products.actions';
import { Product } from './products.model';

interface ProductsStateModel {
  products: Product[];
  productsInCart: Product[];
  shipping: number;
  isLoading: boolean;
}

@State<ProductsStateModel>({
  name: StateName.Products,
  defaults: {
    products: [],
    productsInCart: [],
    shipping: 10000,
    isLoading: false,
  },
})
@Injectable()
export class ProductsState {
  constructor(private firestore: AngularFirestore) {}

  @Selector()
  static fetchProductsList({ products }: ProductsStateModel): Product[] {
    return products;
  }

  @Selector()
  static fetchProductsInCart({
    productsInCart,
  }: ProductsStateModel): Product[] {
    return productsInCart;
  }

  @Selector()
  static isLoading({ isLoading }: ProductsStateModel): boolean {
    return isLoading;
  }

  @Selector()
  static getShippingCost({ shipping }: ProductsStateModel): number {
    return shipping;
  }

  @Selector()
  static getSubTotal({ productsInCart }: ProductsStateModel): number {
    return productsInCart.reduce((acum, product) => acum + product.price, 0);
  }

  @Selector()
  static getGrandTotal({
    productsInCart,
    shipping,
  }: ProductsStateModel): number {
    const price = productsInCart.reduce(
      (acum, product) => acum + product.price,
      0,
    );

    return price + shipping;
  }

  @Action(ProductsActions.Fetch)
  fetch({
    getState,
    patchState,
  }: StateContext<ProductsStateModel>): Observable<Product[]> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    return this.firestore
      .collection<Product>(FirestoreCollection.Products)
      .valueChanges()
      .pipe(tap((products) => patchState({ products, isLoading: false })));
  }

  @Action(ProductsActions.FetchByIds)
  fetchByIds(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { payload }: ProductsActions.FetchByIds,
  ): Observable<Product[]> {
    const state = getState();
    patchState({ ...state, isLoading: false });

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
          isLoading: false,
        });
      }),
    );
  }
}
