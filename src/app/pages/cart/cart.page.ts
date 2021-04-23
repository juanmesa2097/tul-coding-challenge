import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '@app/@core/structs';
import { CartProduct } from '@app/store/cart/cart.model';
import { CartState } from '@app/store/cart/cart.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Select(CartState.fetchCartProducts) cartProducts$!: Observable<
    CartProduct[]
  >;
  @Select(CartState.isLoading) isLoading$!: Observable<boolean>;

  breadcrumbs = [];

  path = Path;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.breadcrumbs = this.activatedRoute.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    // this.store.dispatch(new CartActions.Fetch());
  }
}
