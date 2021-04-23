import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiAvatarModule, TuiBadgedContentModule } from '@taiga-ui/kit';
import { CartButtonComponent } from './cart-button.component';

@NgModule({
  declarations: [CartButtonComponent],
  imports: [
    CommonModule,
    TuiBadgedContentModule,
    TuiAvatarModule,
    TuiButtonModule,
  ],
  exports: [CartButtonComponent],
})
export class CartButtonModule {}
