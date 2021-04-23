import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent implements OnInit {
  @Input() shippingCost!: number;
  @Input() subTotal!: number;
  @Input() grandTotal!: number;

  constructor() {}

  ngOnInit(): void {}
}
