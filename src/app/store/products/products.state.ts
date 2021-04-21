import { Injectable } from '@angular/core';
import { ProductsFirestore } from '@app/services/products-firestore.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsActions } from './products.actions';

interface ProductsStateModel {
  products: Product[];
  isLoading: boolean;
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    isLoading: false,
  },
})
@Injectable()
export class ProductsState {
  constructor(private productsFS: ProductsFirestore) {}

  @Selector()
  static fetchProductsList(state: ProductsStateModel): Product[] {
    return state.products;
  }

  @Selector()
  static isLoading(state: ProductsStateModel): boolean {
    return state.isLoading;
  }

  @Action(ProductsActions.Fetch)
  fetch({
    getState,
    patchState,
  }: StateContext<ProductsStateModel>): Observable<Product[]> {
    patchState({ ...getState(), isLoading: true });

    return this.productsFS
      .collectionOnce$()
      .pipe(tap((products) => patchState({ products, isLoading: false })));
  }
}
