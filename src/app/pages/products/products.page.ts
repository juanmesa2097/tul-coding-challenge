import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsActions } from '@app/store/products/products.actions';
import { Product } from '@app/store/products/products.model';
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

  breadcrumbs = [];

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.breadcrumbs = this.activatedRoute.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductsActions.Fetch());
  }
}
