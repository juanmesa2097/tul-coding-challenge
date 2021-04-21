import { Injectable } from '@angular/core';
import { Product } from '@app/store/products/product.model';
import { from, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    const products: Product[] = [
      { id: 1, name: 'Screwdriver', sku: '123', description: 'lorem' },
      { id: 2, name: 'Tape', sku: '444', description: 'ipsum' },
    ];
    return from([products]).pipe(delay(2000));
  }
}
