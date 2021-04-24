import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignOutPage } from './sign-out.page';

@NgModule({
  declarations: [SignOutPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignOutPage,
      },
    ]),
  ],
})
export class SignOutModule {}
