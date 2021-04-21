import { Injectable } from '@angular/core';
import { ProductsService } from '@app/services/products.service';
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
  constructor(private productsService: ProductsService) {}

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

    return this.productsService
      .getProducts()
      .pipe(map((products) => setState({ products, isLoading: false })));
  }
}
