import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { CredentialsFormComponent } from './credentials-form/credentials-form.component';
import { SignInPage } from './sign-in.page';

@NgModule({
  declarations: [SignInPage, CredentialsFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignInPage,
        data: {
          title: 'Sign into Angular Boilerplate',
          description:
            'Start writing your business logic right away without any concern on architecture matters.',
          robots: 'index, follow',
        },
      },
    ]),
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiFieldErrorModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiNotificationModule,
  ],
  exports: [CredentialsFormComponent],
})
export class SignInModule {}
