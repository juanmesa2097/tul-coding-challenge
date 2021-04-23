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
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  @Input() products!: Product[] | null;

  @Output() addToCart = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  onClickAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
