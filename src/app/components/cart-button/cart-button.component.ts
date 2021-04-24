import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@app/@core/structs';
import { CartProductsState } from '@app/store/cart-products/cart-products.state';
import { Select } from '@ngxs/store';
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this.router.navigate(['/', Path.Cart]);
  }
}
