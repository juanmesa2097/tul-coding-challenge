import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { Observable, Subscription } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

@Component({
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  @Select(ProductsState.fetchProductsList) products$!: Observable<Product[]>;
  @Select(ProductsState.isLoading) fetchLoading$!: Observable<boolean>;
  addLoading = false;

  breadcrumbs = [];

  subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private notificationsService: TuiNotificationsService,
  ) {
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
    const cartId = this.store.selectSnapshot(CartState.fetchCart)?.id;

    this.addLoading = true;

    if (cartId) {
      this.addCartProduct(cartId, product.id)
        .pipe(finalize(() => (this.addLoading = false)))
        .subscribe(() => this.showSuccessMessage());
    } else if (userId && !cartId) {
      const newCart: Cart = {
        status: 'Pending',
        userId,
      };

      this.addCart(newCart)
        .pipe(
          mergeMap(({ cart }) => {
            return this.addCartProduct(cart.cart.id, product.id);
          }),
          finalize(() => (this.addLoading = false)),
        )
        .subscribe(() => this.showSuccessMessage());
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

  private showSuccessMessage(): void {
    const sub = this.notificationsService
      .show(`El producto se agregó al carrito`, {
        status: TuiNotification.Success,
      })
      .subscribe();

    this.subscription.add(sub);
  }

  private showErrorMessage(): void {
    const sub = this.notificationsService
      .show(`El producto ya se encuentra en el carrito`, {
        status: TuiNotification.Error,
      })
      .subscribe();

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
