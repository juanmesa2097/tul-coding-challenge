import { Selector, State } from '@ngxs/store';
import { Product, ProductsStateModel } from './product.model';

@State({
  name: 'products',
  defaults: {
    products: [],
  },
})
export class ProductsState {
  @Selector()
  static getProducts(state: ProductsStateModel): Product[] {
    return state.products;
  }
}
