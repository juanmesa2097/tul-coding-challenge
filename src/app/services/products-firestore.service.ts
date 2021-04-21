import { Injectable } from '@angular/core';
import { FirestoreCollection } from '@app/@core/structs/firestore-collection.enum';
import { Product } from '@app/store/products/product.model';
import { NgxsFirestore } from '@ngxs-labs/firestore-plugin';

@Injectable({
  providedIn: 'root',
})
export class ProductsFirestore extends NgxsFirestore<Product> {
  protected path = FirestoreCollection.Products;
}
