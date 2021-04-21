import { Component, OnInit } from '@angular/core';
import { Product } from '@app/store/products/product.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.products$ = this.store.select((state) => state.products.products);
  }
}
