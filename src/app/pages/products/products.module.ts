import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule, TuiIslandModule } from '@taiga-ui/kit';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsPage } from './products.page';

@NgModule({
  declarations: [ProductsPage, ProductsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsPage,
        data: {
          title: 'Lista de productos',
          robots: 'noindex, nofollow',
          breadcrumbs: [],
        },
      },
    ]),
    TuiLoaderModule,
    TuiBreadcrumbsModule,
    TuiIslandModule,
    TuiButtonModule,
  ],
})
export class ProductsModule {}
