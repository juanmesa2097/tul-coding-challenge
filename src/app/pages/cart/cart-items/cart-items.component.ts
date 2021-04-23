import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '@app/store/products/products.model';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsComponent implements OnInit {
  @Input() products!: Product[];

  constructor() {}

  ngOnInit(): void {}
}
