import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@app/@core/structs';
import { CartProductsActions } from '@app/store/cart-products/cart-products.actions';
import { CartProductsState } from '@app/store/cart-products/cart-products.state';
import { CartState } from '@app/store/cart/cart.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent implements OnInit {
  @Select(CartProductsState.cartProductsCount)
  productsCount$!: Observable<number>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    const cartId = this.store.selectSnapshot(CartState.cartId);

    if (cartId) {
      this.store.dispatch(new CartProductsActions.Fetch(cartId));
    }
  }

  onClick(): void {
    this.router.navigate(['/', Path.Cart]);
  }
}
