import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartPage } from './cart.page';

@NgModule({
  declarations: [CartPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartPage,
      },
    ]),
  ],
})
export class CartModule {}
