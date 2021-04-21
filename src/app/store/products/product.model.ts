export class ProductsStateModel {
  products!: Product[];
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
}
