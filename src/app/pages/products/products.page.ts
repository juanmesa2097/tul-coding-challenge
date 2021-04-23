import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartActions } from '@app/store/cart/cart.actions';
import { Cart } from '@app/store/cart/cart.model';
import { CartState } from '@app/store/cart/cart.state';
import { ProductsActions } from '@app/store/products/products.actions';
import { Product } from '@app/store/products/products.model';
import { ProductsState } from '@app/store/products/products.state';
import { UserState } from '@app/store/user/users.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @Select(ProductsState.fetchProductsList) products$!: Observable<Product[]>;
  @Select(ProductsState.isLoading) isLoading$!: Observable<boolean>;

  breadcrumbs = [];

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.breadcrumbs = this.activatedRoute.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    const user = this.store.selectSnapshot(UserState.user);

    this.store.dispatch(new ProductsActions.Fetch());

    if (user?.id) {
      this.store.dispatch(new CartActions.Fetch(user.id));
    }
  }

  onAddToCart(product: Product): void {
    const userId = this.store.selectSnapshot(UserState.user)?.id;
    const cart = this.store.selectSnapshot(CartState.fetchCart);

    if (userId && !cart) {
      const newCart: Cart = {
        status: 'Pending',
        userId,
      };

      this.store.dispatch(new CartActions.Add(newCart)).subscribe((cart) => {
        console.log(cart);
      });
    }
  }
}
