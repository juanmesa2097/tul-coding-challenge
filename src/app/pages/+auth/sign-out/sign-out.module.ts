import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Path } from '@app/@core/structs';
import { SignOutPage } from './sign-out.page';

@NgModule({
  declarations: [SignOutPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: Path.SignOut,
        component: SignOutPage,
      },
    ]),
  ],
})
export class SignOutModule {}
