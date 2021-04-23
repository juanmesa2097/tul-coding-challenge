import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '@app/@core/structs';
import { ProductsActions } from '@app/store/products/products.actions';
import { Product } from '@app/store/products/products.model';
import { ProductsState } from '@app/store/products/products.state';
import { UserState } from '@app/store/user/users.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Select(ProductsState.fetchProductsList) products$!: Observable<Product[]>;
  // @Select(CartState.fetchCartProducts) cartProducts$!: Observable<
  //   CartProduct[]
  // >;
  @Select(ProductsState.isLoading) isLoading$!: Observable<boolean>;

  breadcrumbs = [];

  path = Path;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.breadcrumbs = this.activatedRoute.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(UserState.user)?.id;

    if (userId) {
      // this.store.dispatch(new cartprod.Fetch(userId));
      this.store.dispatch(new ProductsActions.Fetch());
    }
  }
}
