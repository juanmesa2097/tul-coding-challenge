import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '@app/@core/structs';
import { CartProductsActions } from '@app/store/cart-products/cart-products.actions';
import { CartProductsState } from '@app/store/cart-products/cart-products.state';
import { Product } from '@app/store/products/products.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Select(CartProductsState.fetchProductsInCart) products$!: Observable<
    Product[]
  >;
  @Select(CartProductsState.isLoading) isLoading$!: Observable<boolean>;
  @Select(CartProductsState.getShippingCost) shippingCost$!: Observable<number>;
  @Select(CartProductsState.getSubTotal) subTotal$!: Observable<number>;
  @Select(CartProductsState.getGrandTotal) grandTotal$!: Observable<number>;

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
        this.store.dispatch(new CartProductsActions.FetchByIds(productsIds));
      });
  }

  onDelete(productId: string): void {
    this.store.dispatch(new CartProductsActions.Remove(productId));
  }
}
