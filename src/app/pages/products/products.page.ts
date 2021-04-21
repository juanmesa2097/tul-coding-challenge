import { Component, OnInit } from '@angular/core';
import { Product } from '@app/store/products/product.model';
import { ProductsActions } from '@app/store/products/products.actions';
import { ProductsState } from '@app/store/products/products.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @Select(ProductsState.fetchProductsList) products$!: Observable<Product[]>;
  @Select(ProductsState.isLoading) isLoading!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ProductsActions.Fetch());
  }
}
