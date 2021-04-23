import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Path } from '@app/@core/structs';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartPage } from './cart.page';

@NgModule({
  declarations: [CartPage, CartItemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartPage,
        data: {
          title: 'List of products',
          robots: 'noindex, nofollow',
          breadcrumbs: [
            {
              caption: 'Productos',
              routerLink: `/${Path.Products}`,
            },
            {
              caption: 'El carrito',
              routerLink: `/${Path.Cart}`,
              routerLinkActiveOptions: { exact: true },
            },
          ],
        },
      },
    ]),
    TuiBreadcrumbsModule,
    TuiLoaderModule,
    TuiButtonModule,
  ],
})
export class CartModule {}
