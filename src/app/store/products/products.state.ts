import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { FetchProducts } from './products.actions';

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
  constructor(private firestore: AngularFirestore) {}

  @Selector()
  static fetchProductsList(state: ProductsStateModel): Product[] {
    return state.products;
  }

  @Selector()
  static isLoading(state: ProductsStateModel): boolean {
    return state.isLoading;
  }

  @Action(FetchProducts)
  fetch({
    getState,
    patchState,
    setState,
  }: StateContext<ProductsStateModel>): Observable<ProductsStateModel> {
    const state = getState();
    patchState({ ...state, isLoading: true });

    return this.firestore
      .collection<Product>(FirestoreCollection.Products)
      .valueChanges()
      .pipe(map((products) => setState({ products, isLoading: false })));
  }
}
