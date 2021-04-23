import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProductsActions } from '@app/store/cart-products/cart-products.actions';
import { CartActions } from '@app/store/cart/cart.actions';
import { Cart } from '@app/store/cart/cart.model';
import { CartState } from '@app/store/cart/cart.state';
import { ProductsActions } from '@app/store/products/products.actions';
import { Product } from '@app/store/products/products.model';
import { ProductsState } from '@app/store/products/products.state';
import { UserState } from '@app/store/user/users.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
    console.log(user);

    this.store.dispatch(new ProductsActions.Fetch());

    if (user?.id) {
      this.store.dispatch(new CartActions.Fetch(user.id));
    }
  }

  onAddToCart(product: Product): void {
    const userId = this.store.selectSnapshot(UserState.user)?.id;
    const cartId = this.store.selectSnapshot(CartState.fetchCart)?.id;

    if (cartId) {
      this.addCartProduct(cartId, product.id);
    } else if (userId && !cartId) {
      const newCart: Cart = {
        status: 'Pending',
        userId,
      };

      this.addCart(newCart)
        .pipe(
          mergeMap(({ cart }) => {
            console.log(cart);
            return this.addCartProduct(cart.cart.id, product.id);
          }),
        )
        .subscribe();
    }
  }

  private addCart(cart: Cart) {
    return this.store.dispatch(new CartActions.Add(cart));
  }

  private addCartProduct(cartId: string, productId: string) {
    return this.store.dispatch(
      new CartProductsActions.Add({
        cartId,
        productId,
        quantity: 0,
      }),
    );
  }
}
