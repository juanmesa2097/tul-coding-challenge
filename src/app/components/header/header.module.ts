import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDropdownModule } from '../user-dropdown/user-dropdown.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, UserDropdownModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
