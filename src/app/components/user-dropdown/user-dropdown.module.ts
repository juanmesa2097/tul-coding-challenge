import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
  ],
  exports: [UserDropdownComponent],
})
export class UserDropdownModule {}
