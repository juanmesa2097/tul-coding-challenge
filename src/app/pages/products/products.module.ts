import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsPage } from './products.page';

@NgModule({
  declarations: [ProductsPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsPage,
        data: {
          title: 'List of products',
          robots: 'noindex, nofollow',
        },
      },
    ]),
  ],
})
export class ProductsModule {}
