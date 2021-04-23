import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '@app/@core/structs';
import { CartProductsState } from '@app/store/cart-products/cart-products.state';
import { ProductsActions } from '@app/store/products/products.actions';
import { Product } from '@app/store/products/products.model';
import { ProductsState } from '@app/store/products/products.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Select(ProductsState.fetchProductsInCart) products$!: Observable<Product[]>;
  @Select(ProductsState.isLoading) isLoading$!: Observable<boolean>;
  @Select(ProductsState.getShippingCost) shippingCost$!: Observable<number>;
  @Select(ProductsState.getSubTotal) subTotal$!: Observable<number>;
  @Select(ProductsState.getGrandTotal) grandTotal$!: Observable<number>;

  breadcrumbs = [];

  path = Path;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.breadcrumbs = this.activatedRoute.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    this.store
      .select(CartProductsState.fetchCartProducts)
      .pipe(map((cartProducts) => cartProducts.map((p) => p.productId)))
      .subscribe((productsIds) => {
        this.store.dispatch(new ProductsActions.FetchByIds(productsIds));
      });
  }
}
