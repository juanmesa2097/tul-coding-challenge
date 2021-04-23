import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from '@app/@core/directives/click-outside/click-outside.module';
import {
  TuiButtonModule,
  TuiDropdownModule,
  TuiLinkModule,
} from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { UserDropdownComponent } from './user-dropdown.component';

@NgModule({
  declarations: [UserDropdownComponent],
  imports: [
    CommonModule,
    TuiDropdownModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiLinkModule,
    ClickOutsideModule,
  ],
  exports: [UserDropdownComponent],
})
export class UserDropdownModule {}
