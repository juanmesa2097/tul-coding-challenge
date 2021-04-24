import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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

  @Output() delete = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

  onClickDelete(productId: string): void {
    this.delete.emit(productId);
  }
}
