import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StateName } from '../state-name.enum';
import { ProductsActions } from './products.actions';
import { Product } from './products.model';

interface ProductsStateModel {
  products: Product[];
  isLoading: boolean;
}

@State<ProductsStateModel>({
  name: StateName.Products,
  defaults: {
    products: [],
    isLoading: false,
  },
})
@Injectable()
export class ProductsState {
  constructor(private firestore: AngularFirestore) {}

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
    const state = getState();
    patchState({ ...state, isLoading: true });

    return this.firestore
      .collection<Product>(FirestoreCollection.Products)
      .valueChanges()
      .pipe(
        take(1),
        tap((products) => patchState({ products, isLoading: false })),
      );
  }
}
