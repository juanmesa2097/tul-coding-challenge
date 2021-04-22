import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Path } from '@app/@core/structs';
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
          title: 'List of products',
          robots: 'noindex, nofollow',
          breadcrumbs: [
            {
              caption: 'Products',
              routerLink: `/${Path.Products}`,
            },
          ],
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
